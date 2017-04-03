const shortcutReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_SHORTCUT':
      return {
        id: Date.now(),
        name: action.shortcut.name,
        icon: action.shortcut.icon,
        url: action.shortcut.url
      };

    case 'RENAME_SHORTCUT':
      return {
        ...state,
        name: action.shortcut.name
      }

    default:
      return state;
  }
}

const shortcutsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_SHORTCUT':
      return [
        ...state,
        shortcutReducer(null, action)
      ];

    case 'DELETE_SHORTCUT':
      const i = state.findIndex((shortcut) =>
        shortcut.id === action.shortcut.id);

      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];

    case 'RENAME_SHORTCUT':
      return state.map((shortcut) =>
        shortcut.id === action.shortcut.id ?
        shortcutReducer(shortcut, action) :
        shortcut);

    default:
      return state;
  }
};

export default shortcutsReducer;
