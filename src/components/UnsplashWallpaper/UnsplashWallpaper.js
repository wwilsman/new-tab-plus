import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Unsplash from 'unsplash-js';
import './UnsplashWallpaper.css';

import Icon from '../Icon';
import UnsplashPhoto from '../UnsplashPhoto';
import WallpaperSettings from '../WallpaperSettings';
import Popup from '../Popup';

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
        const limit = parseInt(res.headers.get('x-ratelimit-remaining'), 10);

        if (res.ok || res.status === 404) {
          return res.json();
        } else if (limit === 0) {
          return this.getRandomCachedPhoto();
        }

        debugger;
      })
      .then((data) => {
        if (!data) return;

        if (data.errors) {
          this.setState({
            isLoading: false,
            errors: data.errors
          });

          return;
        }

        cachePhoto(data);
        this.preloadImage(data);
      });
  }

  preloadImage(image) {
    let img = new Image();

    img.onload = () => this.setState({
      isLoading: false,
      image
    });

    img.src = image.urls.thumb;
  }

  getRandomCachedPhoto() {
    const { cache } = this.props;
    const rand = Math.floor(Math.random() * cache.length);
    return cache[rand];
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
                errors={errors}
            />

            {errors && showErrors && (
              <Popup
                  type="error"
                  position="top"
                  alignment="left">
                {errors.map((err, i) => (
                  <div key={i}>
                    {err}
                  </div>
                ))}
              </Popup>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UnsplashWallpaper;
