import { combineReducers } from 'redux';

import {
  reducer as photos,
  transform as photosTransform
} from './photos';

import {
  reducer as shortcuts
} from './shortcuts';

import {
  reducer as settings,
  transform as settingsTransform
} from './settings';

export const reducer = combineReducers({
  photos,
  shortcuts,
  settings
});

export const transforms = [
  photosTransform,
  settingsTransform
];
