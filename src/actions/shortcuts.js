export const newShortcut = (name, url, icon) => {
  return { type: 'NEW_SHORTCUT', shortcut: { name, icon, url } }
}

export const deleteShortcut = (id) => {
  return { type: 'DELETE_SHORTCUT', shortcut: { id } }
}

export const renameShortcut = (id, name) => {
  return { type: 'RENAME_SHORTCUT', shortcut: { id, name } }
}
