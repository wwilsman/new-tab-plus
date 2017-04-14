import React, { Children, Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FirstChild from '../FirstChild';
import './Photo.css';

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();

    const finish = (fn) => {
      return () => {
        img = null;
        fn();
      }
    }

    img.onload = finish(resolve);
    img.onerror = finish(reject);
    img.src = url;
  });
}

class Photo extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    onLoad: PropTypes.func
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  componentWillReceiveProps(props) {
    const {
      thumbnail,
      source,
      onLoad
    } = props;

    const {
      thumbnail:oldThumb,
      source:oldSource
    } = this.props;

    if (thumbnail !== oldThumb || source !== oldSource) {
      this.load(thumbnail, source, onLoad);
    }
  }

  load(
    thumbnail = this.props.thumbnail,
    source = this.props.source,
    onLoad = this.props.onLoad
  ) {
    this.setState({
      isLoading: true
    });

    preloadImage(thumbnail).then(() => {
      if (!this.isUnmounted) {
        if (onLoad) {
          onLoad(thumbnail);
        }

        return preloadImage(source);
      }
    }).then(() => {
      if (!this.isUnmounted) {
        this.setState({
          isLoading: false
        });

        if (onLoad) {
          onLoad(source);
        }
      }
    });
  }

  render() {
    const {
      thumbnail,
      source,
      className,
      children
    } = this.props;

    const {
      isLoading
    } = this.state;

    return (
      <div className={['Photo', className].join(' ')}>
        <div className="Photo__image" style={{
          backgroundImage: `url('${source}')`
        }}/>

        <ReactCSSTransitionGroup
            component={FirstChild}
            transitionName="Photo__thumb"
            transitionEnter={false}
            transitionLeaveTimeout={1000}>
          {!!isLoading && (
             <div className="Photo__thumb" style={{
               backgroundImage: `url('${thumbnail}')`
             }}/>
           )}
        </ReactCSSTransitionGroup>

        {!!children && (
          <div className="Photo__caption">
            {Children.only(children)}
          </div>
        )}
      </div>
    );
  }
}

export default Photo;
