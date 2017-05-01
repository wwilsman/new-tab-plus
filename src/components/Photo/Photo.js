import React, { Children, Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FirstChild from '../FirstChild';
import './Photo.css';

class Photo extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    loadSource: PropTypes.bool
  };

  static defaultProps = {
    loadSource: true
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    if (this.props.loadSource) {
      this.load();
    }
  }

  componentWillUnmount() {
    this.abort && this.abort();
    this.isUnmounted = true;
  }

  componentWillReceiveProps(props) {
    const { loadSource, source } = props;
    const { source:oldSource } = this.props;

    if (loadSource && source !== oldSource) {
      this.load(source);
    } else if (!loadSource && this.abort) {
      this.abort();
    }
  }

  load(
    source = this.props.source
  ) {
    this.abort && this.abort();
    if (!source) return;

    let img = new Image();

    const finish = () => {
      delete this.abort;
      img = null;

      if (!this.isUnmounted) {
        this.setState({
          isLoading: false
        });
      }
    };

    this.abort = () => {
      img.src = '';
    };

    this.setState({
      isLoading: true
    });

    img.onerror = finish;
    img.onload = finish;
    img.src = source;
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
