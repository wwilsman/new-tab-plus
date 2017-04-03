import React from 'react';
import './Shortcut.css';

const Shortcut = ({ name, icon, url }) => (
  <div className="Shortcut">
    <a href={url}>
      <img className="Shortcut__icon" alt={name} src={icon}/>
      <div className="Shortcut__name">{name}</div>
    </a>
  </div>
);

export default Shortcut;
