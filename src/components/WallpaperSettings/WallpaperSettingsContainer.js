import { connect } from 'react-redux';
import { saveSettings } from '../../actions/settings';

import WallpaperSettings from './WallpaperSettings';

const WallpaperSettingsContainer = connect(
  (state) => ({
    settings: state.settings.wallpaper
  }), {
    saveSettings: (settings) =>
      saveSettings('wallpaper', settings)
  }
)(WallpaperSettings);

export default WallpaperSettingsContainer;
