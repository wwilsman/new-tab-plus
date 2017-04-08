import React from 'react';
import './ShortcutGrid.css';

import Shortcut from '../Shortcut';
import Settings from '../Settings';

const ShortcutGrid = ({
  shortcuts
}) => {
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

      <Settings
          modalPosition={isEmpty ? 'center' : 'bottom'}
          modalAlignment={isEmpty ? 'center' : 'right'}
          toggleIcon="plus">
        New Shortcut Settings
      </Settings>
    </div>
  );
};

export default ShortcutGrid;
