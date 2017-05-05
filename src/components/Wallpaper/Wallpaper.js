import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Icon from '../Icon';
import Photo from '../Photo';
import WallpaperSettings from '../WallpaperSettings';
import Popup from '../Popup';
import './Wallpaper.css';

class Wallpaper extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired,
      viewTolerance: PropTypes.number.isRequired
    }).isRequired,
    saveSettings: PropTypes.func.isRequired,
    viewPhoto: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  state = {
    image: false,
    isLoading: this.props.isLoading,
    error: this.props.error,
    showError: true
  };

  componentWillMount() {
    this.showRandomPhoto();
  }

  componentWillReceiveProps(props) {
    const {
      photos,
      settings,
      isLoading,
      error
    } = props;

    const {
      settings:oldSettings,
      isLoading:oldLoading,
      error:oldError
    } = this.props;

    if (isLoading !== oldLoading || error !== oldError) {
      this.setState({
        isLoading,
        error
      });
    }

    const needsFetch = settings.query !== oldSettings.query ||
          settings.featured !== oldSettings.featured;

    if (photos.length && this.needsRefresh) {
      this.needsRefresh = false;
      this.showRandomPhoto(photos, settings);
    } else if (needsFetch) {
      this.props.fetch(settings).then((newPhotos) => {
        this.showRandomPhoto(newPhotos, settings);
      });
    }
  }

  _handleRefresh = () => {
    this.showRandomPhoto();
  }

  _handleShowError = (isSettingsShown) => {
    this.setState({
      showError: !isSettingsShown
    });
  }

  _handleSaveSettings = (settings) => {
    const {
      fetch,
      saveSettings,
      settings:oldSettings
    } = this.props;

    if (settings.query !== oldSettings.query ||
        settings.featured !== oldSettings.featured) {
      return fetch(settings, true).then(() => {
        saveSettings(settings);
      });

    } else if (settings.viewTolerance !== oldSettings.viewTolerance) {
      return Promise.resolve(saveSettings(settings));
    }

    return Promise.resolve();
  }

  showRandomPhoto(
    photos = this.props.photos,
    settings = this.props.settings
  ) {
    let { viewTolerance } = settings;
    let viewCount = 0;
    let filtered = [];

    if (this.needsRefresh) return;

    const hasLowViews = (photo) => {
      return photo.viewed <= viewCount;
    };

    this.setState({
      isLoading: true
    });

    if (this.state.error) {
      viewTolerance = Infinity;
    }

    while (photos.length && !filtered.length &&
           viewCount < viewTolerance) {
      filtered = photos.filter(hasLowViews);
      viewCount += 1;
    }

    if (!filtered.length) {
      if (!this.needsRefresh) {
        this.needsRefresh = true;
        this.props.fetch(settings);
      }

      return;
    }

    const rand = Math.floor(Math.random() * filtered.length);
    const image = filtered[rand];

    this.props.viewPhoto(image.id);
    this.preloadPhoto(image);
  }

  preloadPhoto(data) {
    let img = new Image();

    const finish = () => {
      img = null;
      this.setState({
        isLoading: false,
        image: data
      });
    };

    img.onload = finish;
    img.onerror = finish;
    img.src = data.thumb;
  }

  render() {
    const {
      settings,
      children
    } = this.props;

    const {
      image,
      isLoading,
      error,
      showError
    } = this.state;

    return (
      <div className="Wallpaper">
        <ReactCSSTransitionGroup
            className="Wallpaper__container"
            transitionName="Wallpaper__photo"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
          {!!image && (
             <Photo
                 key={image.id}
                 className="Wallpaper__photo"
                 loadSource={!isLoading}
                 thumbnail={image.thumb}
                 source={image.url}>
               <span>
                 <a href={image.authorUrl}>{image.author}</a>
                 <span>{'\u00A0\u00A0/\u00A0\u00A0'}</span>
                 <a href={image.sourceUrl}>{image.source}</a>
               </span>
             </Photo>
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
                onSave={this._handleSaveSettings}
                onToggle={this._handleShowError}
                isLoading={isLoading}
                settings={settings}
                error={error}
            />

            {(error && showError) && (
              <Popup
                  type="error"
                  position="top"
                  alignment="left">
                <p>{error}</p>
              </Popup>
            )}
          </div>

          {!!(image && image.download) && (
            <a className="Wallpaper__download" href={image.download} download>
              <Icon name="arrow-down" fixed/>
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Wallpaper;
