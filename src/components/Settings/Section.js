import React from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

const SettingsSection = ({
  type,
  className,
  alignItems,
  children
}) => (
  <div className={[
         'Settings__section',
         !!alignItems && `Settings__section--align-${alignItems}`,
         !!type && `Settings__section--${type}`,
         className
       ].filter(Boolean).join(' ')}>
    {children}
  </div>
);

SettingsSection.propTypes = {
  type: PropTypes.oneOf(['error']),
  alignItems: PropTypes.oneOf(['start', 'end'])
};

export default SettingsSection;
