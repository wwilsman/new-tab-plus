import { applyMiddleware, createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux';
import persistStorage from './utils/persistStorage';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
    storage: persistStorage
  });

  return store;
};

export default configureStore;
