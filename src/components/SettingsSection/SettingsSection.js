import React from 'react';
import './SettingsSection.css';

const SettingsSection = ({
  type = 'default',
  children
}) => (
  <div className={[
         'SettingsSection',
         `SettingsSection--${type}`
       ].join(' ')}>
    {children}
  </div>
);

export default SettingsSection;
