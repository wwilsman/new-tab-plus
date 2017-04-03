/* global chrome */

let storage;

const chromeStorage = {
  getItem: (key, cb) => chrome.storage.sync.get(key, cb),
  setItem: (key, item, cb) => chrome.storage.sync.set({ [key]: item }, cb),
  removeItem: (key, cb) => chrome.storage.sync.remove(key, cb),
  getAllKeys: (cb) => chrome.storage.sync.get(null, (items) => cb(null, Object.keys(items)))
};

if (chrome && chrome.storage) {
  storage = chromeStorage;
}

export default storage;
