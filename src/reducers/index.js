import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import photosReducer from './photos';

const rootReducer = combineReducers({
  photos: photosReducer,
  router: routerReducer
});

export default rootReducer;
