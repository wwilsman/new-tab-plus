import React, { PropTypes } from 'react';
import './Settings.css';

const SettingsSection = ({
  type,
  className,
  children
}) => (
  <div className={[
         'Settings__section',
         !!type && `Settings__section--${type}`,
         className
       ].filter(Boolean).join(' ')}>
    {children}
  </div>
);

SettingsSection.propTypes = {
  type: PropTypes.oneOf(['error'])
};

export default SettingsSection;
