import { createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist'
import persistStorage from './utils/persistStorage';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      autoRehydrate()
    )
  );

  persistStore(store, {
    storage: persistStorage
  });

  return store;
};

export default configureStore;
