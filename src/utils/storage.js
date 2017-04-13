/* global chrome */

let storage;

if (chrome && chrome.storage) {
  const chromeStorage = chrome.storage.sync;

  storage = {
    getItem: (key, cb) => chromeStorage.get(key, (items) => cb(null, items[key])),
    setItem: (key, item, cb) => chromeStorage.set({ [key]: item }, cb),
    removeItem: (key, cb) => chromeStorage.remove(key, cb),
    getAllKeys: (cb) => chromeStorage.get(null, (items) => cb(null, Object.keys(items)))
  };
}

export default storage;
