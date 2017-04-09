import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Unsplash from 'unsplash-js';
import './UnsplashWallpaper.css';

import Icon from '../Icon';
import UnsplashPhoto from '../UnsplashPhoto';
import WallpaperSettings from '../WallpaperSettings';

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_APPID,
  secret: process.env.REACT_APP_UNSPLASH_SECRET,
  callbackUrl: process.env.REACT_APP_UNSPLASH_CALLBACK
});

class UnsplashWallpaper extends Component {
  static propTypes = {
    cache: PropTypes.array.isRequired,
    cachePhoto: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired,
      fetch: PropTypes.bool.isRequired
    }).isRequired
  };

  state = {
    image: false,
    isLoading: true
  };

  componentWillMount() {
    if (this.props.settings.fetch) {
      this.getRandomFeaturedPhoto();
    }
  }

  componentWillReceiveProps(props) {
    const {
      query,
      featured,
      fetch
    } = props.settings;

    const {
      query:oldQuery,
      featured:oldFeatured,
      fetch:oldFetch
    } = this.props.settings;

    const settingChanged = query !== oldQuery ||
          featured !== oldFeatured;

    if (fetch && (!oldFetch || settingChanged)) {
      this.getRandomFeaturedPhoto(query, featured);
    }
  }

  _handleRefresh = () => {
    this.getRandomFeaturedPhoto();
  }

  getRandomFeaturedPhoto(
    query = this.props.settings.query,
    featured = this.props.settings.featured
  ) {
    const {
      cachePhoto
    } = this.props;

    this.setState({
      isLoading: true
    });

    unsplash
      .photos.getRandomPhoto({
        query: query.replace(' ', '+'),
        featured
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
      <div className="Wallpaper">
        <ReactCSSTransitionGroup
            className="Wallpaper__container"
            transitionName="Wallpaper__image"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
          {!!image && (
             <UnsplashPhoto
                 key={image.id}
                 className="Wallpaper__image"
                 {...image}
             />
           )}
        </ReactCSSTransitionGroup>

        <div className="Wallpaper__content">
          {children}
        </div>

        <div className="Wallpaper__actions">
          <button
              className="Wallpaper__refresh"
              onClick={this._handleRefresh}
              disabled={isLoading}>
            <Icon name="refresh" fixed spin={isLoading}/>
          </button>

          <WallpaperSettings/>
        </div>
      </div>
    );
  }
}

export default UnsplashWallpaper;
