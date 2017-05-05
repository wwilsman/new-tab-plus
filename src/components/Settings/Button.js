import React from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

const SettingsButton = ({
  unimportant,
  ...props
}) => (
  <button
      className={[
        'Settings__button',
        !!unimportant && 'Settings__button--unimportant'
      ].filter(Boolean).join(' ')}
      {...props}
  />
);

SettingsButton.propTypes = {
  unimportant: PropTypes.bool
};

export default SettingsButton;
