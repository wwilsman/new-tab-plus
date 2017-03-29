import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Unsplash from 'unsplash-js';
import './Background.css';

import Icon from '../Icon';
import UnsplashPhoto from '../UnsplashPhoto';

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_APPID,
  secret: process.env.REACT_APP_UNSPLASH_SECRET,
  callbackUrl: process.env.REACT_APP_UNSPLASH_CALLBACK
});

class Background extends Component {
  static propTypes = {
    cache: PropTypes.array.isRequired,
    cachePhoto: PropTypes.func.isRequired,
    query: PropTypes.string
  };

  static defaultProps = {
    query: ''
  };

  state = {
    image: false,
    isLoading: true
  };

  componentWillMount() {
    this.getRandomFeaturedPhoto();
  }

  componentWillReceiveProps(props) {
    if (props.query !== this.props.query) {
      this.getRandomFeaturedPhoto(props.query);
    }
  }

  _handleRefresh = () => {
    this.getRandomFeaturedPhoto();
  }

  getRandomFeaturedPhoto(
    query = this.props.query
  ) {
    const { cachePhoto } = this.props;

    this.setState({
      isLoading: true
    });

    unsplash
      .photos.getRandomPhoto({
        featured: true,
        query
      })
      .then((res) => {
        const limit = parseInt(res.headers.get('x-ratelimit-remaining'), 10);

        if (res.ok) {
          return res.json();
        } else if (limit === 0) {
          return this.getRandomCachedPhoto();
        }
      })
      .then((data) => {
        if (!data) return;
        cachePhoto(data);

        let img = new Image();

        img.onload = () => this.setState({
          image: data,
          isLoading: false
        });

        img.src = data.urls.thumb;
      });
  }

  getRandomCachedPhoto() {
    const { cache } = this.props;
    const rand = Math.floor(Math.random() * cache.length);
    return cache[rand];
  }

  render() {
    const { children } = this.props;
    const { image, isLoading } = this.state;

    return (
      <div className="Background">
        <ReactCSSTransitionGroup
            className="Background__container"
            transitionName="Background__image"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
          {!!image && (
             <UnsplashPhoto key={image.id} className="Background__image" {...image}/>
           )}
        </ReactCSSTransitionGroup>

        <div className="Background__content">
          {children}
        </div>

        <button
            className="Background__refresh"
            onClick={this._handleRefresh}
            disabled={isLoading}>
          <Icon name="refresh" fixed spin={isLoading}/>
        </button>
      </div>
    );
  }
}

export default Background;
