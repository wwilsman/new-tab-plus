import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Navigation from './Navigation';

const NavigationContainer = connect(
  (state) => ({
    location: state.router.location
  }), {
    push
  }
)(Navigation);

export default NavigationContainer;
