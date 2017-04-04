import { combineReducers } from 'redux';

import photosReducer from './photos';
import shortcutsReducer from './shortcuts';

const rootReducer = combineReducers({
  photos: photosReducer,
  shortcuts: shortcutsReducer
});

export default rootReducer;
