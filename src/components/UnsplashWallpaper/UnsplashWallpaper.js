import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Unsplash from 'unsplash-js';
import './UnsplashWallpaper.css';

import Icon from '../Icon';
import UnsplashPhoto from '../UnsplashPhoto';
import WallpaperSettings from '../WallpaperSettings';
import Popup from '../Popup';

const fixWidow = (string) => {
  const nbsp = String.fromCharCode(parseInt('0x00A0', 16));
  return string.replace(/\s([^\s]*)$/, `${nbsp}$1`);
}

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
    isLoading: true,
    errors: null,
    showErrors: true
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

  _handleShowErrors = (isSettingsShown) => {
    this.setState({
      showErrors: !isSettingsShown
    });
  }

  preloadImage(image, errors) {
    let img = new Image();

    img.onload = () => this.setState({
      errors: (errors && errors.length) ? errors : null,
      isLoading: false,
      image
    });

    img.src = image.urls.thumb;
  }

  getRandomFeaturedPhoto(
    query = this.props.settings.query,
    featured = this.props.settings.featured
  ) {
    const {
      cachePhoto
    } = this.props;

    this.setState({
      isLoading: true,
      errors: null
    });

    unsplash
      .photos.getRandomPhoto({
        query: query.replace(' ', '+'),
        featured
      })
      .then((res) => {
        if (res.status === 403) {
          return res.text().then((text) => ({
            errors: [text]
          }));
        }

        return res.json();
      })
      .then(({ errors, ...data }) => {
        if (errors) {
          data = this.getRandomCachedPhoto();
          errors = [...errors, 'Using Cached Photo'];
        } else {
          cachePhoto(data);
        }

        if (data) {
          this.preloadImage(data, errors);
        }
      });
  }

  getRandomCachedPhoto() {
    const { cache } = this.props;

    if (cache.length) {
      const rand = Math.floor(Math.random() * cache.length);
      return cache[rand];
    } else {
      this.setState({
        errors: ['Cannot Find Cached Photos']
      });
    }
  }

  render() {
    const {
      children
    } = this.props;

    const {
      image,
      isLoading,
      errors,
      showErrors
    } = this.state;

    const errorMessage = !!(errors && errors.length) ?
          fixWidow(errors.join('. ')) + '.' : null;

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

          <div className="Wallpaper__settings">
            <WallpaperSettings
                onToggle={this._handleShowErrors}
                error={errorMessage}
            />

            {(errorMessage && showErrors) && (
              <Popup
                  type="error"
                  position="top"
                  alignment="left">
                <p>{errorMessage}</p>
              </Popup>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UnsplashWallpaper;
