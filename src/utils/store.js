import { applyMiddleware, createStore, compose } from 'redux';
import { getStoredState, persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';

import storage from './storage';
import { reducer, transforms } from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (callback) => {
  const config = { storage, transforms };

  getStoredState(config, (err, restoredState) => {
    const store = createStore(
      reducer,
      restoredState,
      composeEnhancers(
        applyMiddleware(
          thunkMiddleware
        )
      )
    );

    persistStore(store, config);

    callback(store);
  });
};

export default configureStore;
