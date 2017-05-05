import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './Section';
import './Settings.css';

class SettingsStepper extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    min: 0,
    max: 99
  };

  _handleStepUp = (e) => {
    const {
      value,
      max,
      onChange
    } = this.props;

    onChange(Math.min(value + 1, max));
  }

  _handleStepDown = (e) => {
    const {
      value,
      min,
      onChange
    } = this.props;

    onChange(Math.max(value - 1, min));
  }

  render() {
    const {
      label,
      value,
      min,
      max
    } = this.props;

    const btnUpDisabled = value >= max;
    const btnDownDisabled = value <= min;

    const btnUpClassName = [
      'Settings__stepper-field__up',
      btnUpDisabled && 'Settings__stepper-field--disabled'
    ].filter(Boolean).join(' ');

    const btnDownClassName = [
      'Settings__stepper-field__down',
      btnDownDisabled && 'Settings__stepper-field--disabled'
    ].filter(Boolean).join(' ');

    return (
      <Section>
        <label className="Settings__label">
          {label}
        </label>

        <div className="Settings__stepper-field">
          <button
              className={btnDownClassName}
              onClick={this._handleStepDown}
              disabled={btnDownDisabled}
          />

          <div className="Settings__stepper-field__value">
            {value}
          </div>

          <button
              className={btnUpClassName}
              onClick={this._handleStepUp}
              disabled={btnUpDisabled}
          />
        </div>
      </Section>
    );
  }
}

export default SettingsStepper;
