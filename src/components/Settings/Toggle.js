import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './Section';
import './Settings.css';

class SettingsToggle extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  _handleToggle = () => {
    const {
      value,
      onChange
    } = this.props;

    onChange(!value);
  }

  render() {
    const {
      label,
      value
    } = this.props;

    const toggleClassName = [
      'Settings__toggle-field',
      `Settings__toggle-field--${value ? 'on' : 'off'}`,
    ].join(' ');

    return (
      <Section>
        <label className="Settings__label">
          {label}
        </label>

        <div
            className={toggleClassName}
            onClick={this._handleToggle}
        />
      </Section>
    );
  }
}

export default SettingsToggle;
