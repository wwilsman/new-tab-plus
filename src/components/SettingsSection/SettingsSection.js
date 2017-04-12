import React, { PropTypes } from 'react';
import './SettingsSection.css';

const SettingsSection = ({
  type = 'default',
  className,
  children
}) => (
  <div className={[
         'SettingsSection',
         `SettingsSection--${type}`,
         className
       ].filter(Boolean).join(' ')}>
    {children}
  </div>
);

SettingsSection.propTypes = {
  type: PropTypes.oneOf(['default', 'error'])
};

export default SettingsSection;
