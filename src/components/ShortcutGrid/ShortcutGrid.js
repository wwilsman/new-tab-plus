import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shortcut from '../Shortcut';
import ShortcutSettings from '../ShortcutSettings';
import './ShortcutGrid.css';

class ShortcutGrid extends Component {
  static propTypes = {
    shortcuts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })).isRequired,
    createShortcut: PropTypes.func.isRequired
  }

  _handleCreateShortcut = (shortcut) => {
    this.props.createShortcut(shortcut);
  }

  render() {
    const { shortcuts } = this.props;
    const isEmpty = !shortcuts.length;

    const className = [
      'ShortcutGrid',
      isEmpty && 'ShortcutGrid--is-empty'
    ].filter(Boolean).join(' ');

    return (
      <div className={className}>
        <div className="ShortcutGrid__items">
          {shortcuts.map(({ id, ...shortcut }) => (
            <div key={id} className="ShortcutGrid__item">
              <Shortcut {...shortcut}/>
            </div>
          ))}
        </div>

        <ShortcutSettings
            onCreateShortcut={this._handleCreateShortcut}
            centered={isEmpty}
        />
      </div>
    );
  }
}

export default ShortcutGrid;
