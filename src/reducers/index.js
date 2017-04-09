import { combineReducers } from 'redux';

import photosReducer from './photos';
import shortcutsReducer from './shortcuts';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  photos: photosReducer,
  shortcuts: shortcutsReducer,
  settings: settingsReducer
});

export default rootReducer;
