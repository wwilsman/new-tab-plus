import { connect } from 'react-redux';
import { viewPhoto, fetchPhotos } from '../../actions/photos';
import { saveSettings } from '../../actions/settings';

import Wallpaper from './Wallpaper';

const WallpaperContainer = connect(
  (state) => ({
    photos: state.photos.data,
    settings: state.settings.wallpaper,
    isLoading: state.photos.loading,
    error: state.photos.error || null
  }),
  {
    fetch: fetchPhotos,
    saveSettings: (settings) =>
      saveSettings('wallpaper', settings),
    viewPhoto
  },
  null,
  { pure: false }
)(Wallpaper);

export default WallpaperContainer;
