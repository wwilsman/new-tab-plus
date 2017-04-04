import React from 'react';
import './ShortcutGrid.css';

import Shortcut from '../Shortcut';
import Settings from '../Settings';

const ShortcutGrid = ({
  shortcuts
}) => (
  <div className="ShortcutGrid">
    {shortcuts.map(({ id, ...shortcut }) => (
       <div key={id} className="ShortcutGrid__item">
         <Shortcut {...shortcut}/>
       </div>
     ))}

    <Settings
        className="ShortcutGrid__settings"
        modalPosition="bottom"
        modalAlignment="right">
      Shortcut Settings
    </Settings>
  </div>
);

export default ShortcutGrid;
