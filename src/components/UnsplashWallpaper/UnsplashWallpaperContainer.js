import { connect } from 'react-redux';
import { cachePhoto } from '../../actions/photos';

import UnsplashWallpaper from './UnsplashWallpaper';

const UnsplashWallpaperContainer = connect(
  (state) => ({
    cache: state.photos
  }), {
    cachePhoto
  }, null, {
    pure: false
  }
)(UnsplashWallpaper);

export default UnsplashWallpaperContainer;
