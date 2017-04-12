import { connect } from 'react-redux';
import { cachePhoto } from '../../actions/photos';
import { saveSettings } from '../../actions/settings';

import UnsplashWallpaper from './UnsplashWallpaper';

const UnsplashWallpaperContainer = connect(
  (state) => ({
    cache: state.photos,
    settings: state.settings.wallpaper
  }), {
    cachePhoto,
    saveSettings: (settings) =>
      saveSettings('wallpaper', settings)
  }, null, {
    pure: false
  }
)(UnsplashWallpaper);

export default UnsplashWallpaperContainer;
