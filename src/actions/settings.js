export const saveSettings = (key, payload) => {
  return { type: 'SAVE_SETTINGS', settings: { key, payload } };
};
