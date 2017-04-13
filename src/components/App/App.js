import React from 'react';
import { Provider } from 'react-redux'

import UnsplashWallpaper from '../UnsplashWallpaper';
import ShortcutGrid from '../ShortcutGrid';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <UnsplashWallpaper>
      <ShortcutGrid/>
    </UnsplashWallpaper>
  </Provider>
);

App.propTypes = {
  store: Provider.propTypes.store
};

export default App;
