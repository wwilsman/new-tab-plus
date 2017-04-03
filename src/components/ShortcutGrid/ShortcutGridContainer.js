import { connect } from 'react-redux';

import ShortcutGrid from './ShortcutGrid';

const ShortcutGridContainer = connect(
  (state) => ({
    shortcuts: state.shortcuts
  })
)(ShortcutGrid);

export default ShortcutGridContainer;
