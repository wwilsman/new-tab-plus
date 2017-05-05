import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from 'lz-string';
/* global chrome */

let storage;

// chrome storage interface
if (chrome && chrome.storage) {
  storage = {
    // allows saving strings longer than QUOTA_BYTES_PER_ITEM in multiple, compressed chunks
    setItem(key, value, callback) {
      const storageLimit = chrome.storage.sync.QUOTA_BYTES_PER_ITEM;

      // compress using URI encoding because chrome.storage does stuff to utf-16
      value = compressToEncodedURIComponent(value);

      let i = 0;
      let cache = {};

      // split long values into smaller chunks
      while (value.length > 0) {
        const cacheKey = getCacheKey(key, i);
        const chunkLen = storageLimit - cacheKey.length - 2;
        cache[cacheKey] = value.substr(0, chunkLen);
        value = value.substr(chunkLen);
        i++;
      }

      // save all chunks followed by an empty chunk
      chrome.storage.sync.set(cache, callback);
      chrome.storage.sync.remove(getCacheKey(key, i));
    },

    // reassembles chunks for items that have been split
    getItem(key, callback) {
      const itemLimit = chrome.storage.sync.MAX_ITEMS;

      chrome.storage.sync.get(null, (items) => {
        let value = '';

        // assemble chunks, stopping at the first empty chunk
        for (let i = 0; i < itemLimit; i++) {
          if (items[getCacheKey(key, i)] === undefined) break;
          value += items[getCacheKey(key, i)];
        }

        // decompress
        value = decompressFromEncodedURIComponent(value);

        // callback expects first arg to be an error
        callback(null, value);
      });
    },

    // StorageArea.removeItem
    removeItem(key, callback) {
      chrome.storage.sync.remove(key, callback);
    },

    // StorageArea.getAllKeys
    getAllKeys(callback) {
      chrome.storage.sync.get(null, (items) => {
        callback(null, Object.keys(items).filter((key) => {
          return !(/_\d*$/).test(key);
        }));
      });
    }
  };
}

// helper to compute key at index
function getCacheKey(key, i) {
  return i ? `${key}_${i}` : key;
}

export default storage;
