import React from 'react';
import { render } from 'react-dom';

import configureStore from './utils/store';
import App from './components/App';
import './index.css';

configureStore((store) => {
  render(
    <App store={store}/>,
    document.getElementById('root')
  );
});
