import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './UnsplashPhoto.css';

import Icon from '../Icon';
import FirstChild from '../FirstChild';

class UnsplashPhoto extends Component {
  static propTypes = {
    links: PropTypes.shape({
      download: PropTypes.string.isRequired
    }).isRequired,
    urls: PropTypes.shape({
      full: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      links: PropTypes.shape({
        html: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    isImageLoading: true
  }

  componentDidMount() {
    this.triggerImageLoading();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  componentWillReceiveProps(props) {
    if (props.urls.full !== this.props.urls.full) {
      this.setState({ isImageLoading: true });
      this.triggerImageLoading(props.urls.full);
    }
  }

  triggerImageLoading(
    imageURL = this.props.urls.full
  ) {
    let img = new Image();

    img.onload = () => {
      !this.isUnmounted && this.setState({
        isImageLoading: false
      });
    }

    img.src = imageURL;
  }

  render() {
    const { className, links, urls, user } = this.props;
    const { isImageLoading } = this.state;

    return (
      <div className={['Photo', className].join(' ')}>
        <div className="Photo__image" style={{
          backgroundImage: `url('${urls.full}')`
        }}/>

        <ReactCSSTransitionGroup
            component={FirstChild}
            transitionName="Photo__thumb"
            transitionEnter={false}
            transitionLeaveTimeout={1000}>
          {!!isImageLoading && (
             <div className="Photo__thumb" style={{
               backgroundImage: `url('${urls.thumb}')`
             }}/>
           )}
        </ReactCSSTransitionGroup>

        <div className="Photo__info">
          {!!user && (
             <span className="Photo__credit">
               <a href={user.links.html}>{user.name}</a>
               <span>{'\u00A0\u00A0/\u00A0\u00A0'}</span>
               <a href="https://unsplash.com/">Unsplash</a>
             </span>
           )}

          <a className="Photo__download" href={links.download} download>
            <Icon name="arrow-down" fixed/>
          </a>
        </div>
      </div>
    );
  }
}

export default UnsplashPhoto;
