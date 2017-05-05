import { createTransform } from 'redux-persist';
import withDefaults from '../utils/with-defaults';

const defaultSettings = {
  wallpaper: {
    query: '',
    featured: true,
    viewTolerance: 1
  }
};

export const transform = createTransform(
  (inbound) => inbound,
  (outbound) => withDefaults(outbound, defaultSettings, true),
  { whitelist: ['settings'] }
);

export const reducer = (
  state = defaultSettings,
  action
) => {
  switch(action.type) {
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
