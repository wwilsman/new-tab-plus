import { createStore, compose } from 'redux';
import { getStoredState, persistStore } from 'redux-persist'

import storage from './storage';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (callback) => {
  const config = { storage };

  getStoredState(config, (err, restoredState) => {
    const store = createStore(
      rootReducer,
      restoredState,
      composeEnhancers()
    );

    persistStore(store, config);

    callback(store);
  });
};

export default configureStore;
