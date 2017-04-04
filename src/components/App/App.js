import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';

import configureStore from '../../store';

import UnsplashWallpaper from '../UnsplashWallpaper';
import ShortcutGrid from '../ShortcutGrid';

class App extends Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <UnsplashWallpaper>
          <ShortcutGrid/>
        </UnsplashWallpaper>
      </Provider>
    );
  }
}

export default App;
