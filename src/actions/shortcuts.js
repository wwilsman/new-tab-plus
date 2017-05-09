export const createShortcut = (shortcut) => ({
  type: 'CREATE_SHORTCUT',
  shortcut
});

export const deleteShortcut = (id) => ({
  type: 'DELETE_SHORTCUT',
  shortcut: {
    id
  }
});

export const renameShortcut = (id, name) => ({
  type: 'RENAME_SHORTCUT',
  shortcut: {
    id,
    name
  }
});

export const reorderShortcut = (id, index) => ({
  type: 'REORDER_SHORTCUT',
  shortcut: {
    index,
    id
  }
});
