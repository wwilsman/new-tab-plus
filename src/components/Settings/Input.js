import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './Section';
import './Settings.css';

class SettingsInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func
  };

  _handleChange = (e) => {
    const {
      onChange,
      onChangeText
    } = this.props;

    onChange && onChange(e);
    onChangeText && onChangeText(e.target.value);
  }

  _handleKeyDown = (e) => {
    const {
      onEnter
    } = this.props;

    if (onEnter && e.which === 13) {
      onEnter();
    }
  }

  render() {
    const {
      value,
      placeholder,
      label
    } = this.props;

    return (
      <Section>
        <label className="Settings__label">
          {label}
        </label>

        <input
            className="Settings__input-field"
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            placeholder={placeholder}
            value={value}
        />
      </Section>
    );
  }
}

export default SettingsInput;
