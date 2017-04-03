import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photosReducer from './photos';
import shortcutsReducer from './shortcuts';

const rootReducer = combineReducers({
  photos: photosReducer,
  router: routerReducer,
  shortcuts: shortcutsReducer
});

export default rootReducer;
