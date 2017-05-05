import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
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
    isLoading: true,
    didError: false
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
    let didError = false;

    const finish = () => {
      delete this.abort;
      img = null;

      if (!this.isUnmounted) {
        this.setState({
          isLoading: false,
          didError
        });
      }
    };

    const error = () => {
      didError = true;
      img.src = '';
      finish();
    };

    this.abort = error;
    img.onerror = error;
    img.onload = finish;

    this.setState({
      isLoading: true
    });

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
      isLoading,
      didError
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
          {(!!isLoading || !!didError) && (
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
