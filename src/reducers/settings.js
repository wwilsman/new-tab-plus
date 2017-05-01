const defaultSettings = {
  wallpaper: {
    query: '',
    featured: true
  }
};

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
