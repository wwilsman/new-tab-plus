import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Settings from './Settings';

const SettingsContainer = connect(
  null, {
    push
  }
)(Settings);

export default SettingsContainer;
