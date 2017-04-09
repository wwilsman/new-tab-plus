import { REHYDRATE } from 'redux-persist/constants';

const defaultSettings = {
  wallpaper: {
    query: '',
    featured: true,
    fetch: false
  }
};

const settingsReducer = (state = defaultSettings, action) => {
  switch(action.type) {
    case REHYDRATE:
      const { settings } = action.payload;

      return settings ? {
        ...state,
        ...settings,
        wallpaper: {
          ...state.wallpaper,
          ...settings.wallpaper,
          fetch: true
        }
      } : {
        ...state,
        wallpaper: {
          ...state.wallpaper,
          fetch: true
        }
      };

    case 'SAVE_SETTINGS':
      return {
        ...state,
        [action.settings.key]: {
          ...state[action.settings.key],
          ...action.settings.payload
        }
      };

    default:
      return state;
  }
};

export default settingsReducer;
