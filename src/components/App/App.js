import React from 'react';
import { Provider } from 'react-redux'

import Wallpaper from '../Wallpaper';
import ShortcutGrid from '../ShortcutGrid';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Wallpaper>
      <ShortcutGrid/>
    </Wallpaper>
  </Provider>
);

App.propTypes = {
  store: Provider.propTypes.store
};

export default App;
