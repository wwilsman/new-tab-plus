/* global chrome */
import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const chromeStorage = {
  getItem: (key, cb) => chrome.storage.sync.get(key, cb),
  setItem: (key, item, cb) => chrome.storage.sync.set({ [key]: item }, cb),
  removeItem: (key, cb) => chrome.storage.sync.remove(key, cb),
  getAllKeys: (cb) => chrome.storage.sync.get(null, (items) => cb(null, Object.keys(items)))
};

const configureStore = (
  initialState = {},
  history
) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history)
      ),
      autoRehydrate()
    )
  );

  persistStore(store, {
    blacklist: ['router'],
    storage: chrome ? chromeStorage : localStorage
  });

  return store;
};

export default configureStore;
