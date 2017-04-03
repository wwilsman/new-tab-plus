import React from 'react';
import './ShortcutGrid.css';

import Shortcut from '../Shortcut';

const ShortcutGrid = ({
  shortcuts
}) => (
  <div className="ShortcutGrid">
    {shortcuts.map(({ id, ...shortcut }) => (
       <div key={id} className="ShortcutGrid__item">
         <Shortcut {...shortcut}/>
       </div>
     ))}
  </div>
);

export default ShortcutGrid;
