import React, { Component, PropTypes } from 'react';
import './ToggleField.css';

import Section from '../SettingsSection';

class ToggleField extends Component {
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
      'ToggleField__toggle',
      `ToggleField__toggle--${value ? 'enabled' : 'disabled'}`,
    ].join(' ');

    return (
      <Section className="ToggleField">
        <label className="ToggleField__label">
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

export default ToggleField;
