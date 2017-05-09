import { connect } from 'react-redux';

import {
  createShortcut
} from '../../actions/shortcuts';

import ShortcutGrid from './ShortcutGrid';

const ShortcutGridContainer = connect(
  (state) => ({
    shortcuts: state.shortcuts
  }), {
    createShortcut
  }
)(ShortcutGrid);

export default ShortcutGridContainer;
