import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import './App.css';

import createHistory from 'history/createMemoryHistory';
import configureStore from '../../store';

import Background from '../Background';
import Navigation from '../Navigation';
import Settings from '../Settings';

class App extends Component {
  history = createHistory();
  store = configureStore({}, this.history);

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Background>
            <Navigation/>
            <Route path="/settings" component={Settings}/>
          </Background>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
