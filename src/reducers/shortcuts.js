const initialShortcutState = {
  id: 0,
  name: 'New Shortcut',
  icon: '',
  url: '#'
};

const shortcutReducer = (
  state = initialShortcutState,
  action
) => {
  switch (action.type) {
    case 'CREATE_SHORTCUT':
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
      };

    default:
      return state;
  }
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_SHORTCUT':
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

    case 'REORDER_SHORTCUT':
      const index = state.findIndex((shortcut) =>
        shortcut.id === action.shortcut.id);

      state = [...state];
      const shortcut = state.splice(index, 1)[0];
      state.splice(action.shortcut.index, 0, shortcut);
      return state;

    default:
      return state;
  }
};
