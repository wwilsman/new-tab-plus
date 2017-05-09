import React from 'react';
import './Shortcut.css';

const Shortcut = ({ name, icon, url }) => (
  <div className="Shortcut">
    <a href={url}>
      <div
          className="Shortcut__icon"
          style={{
            backgroundImage: `url('${icon}')`
          }}
      />

      <div className="Shortcut__name">{name}</div>
    </a>
  </div>
);

export default Shortcut;
