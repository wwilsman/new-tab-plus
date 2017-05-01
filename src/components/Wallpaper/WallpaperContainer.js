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
  (dispatch) => ({
    fetch: (settings) =>
      dispatch(fetchPhotos(settings)),
    saveSettings: (settings) =>
      dispatch(fetchPhotos(settings, true)).then(() => (
        dispatch(saveSettings('wallpaper', settings))
      )),
    viewPhoto: (id) =>
      dispatch(viewPhoto(id))
  }), null, {
    pure: false
  }
)(Wallpaper);

export default WallpaperContainer;
