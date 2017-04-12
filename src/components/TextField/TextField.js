import React, { Component, PropTypes } from 'react';
import './TextField.css';

import Section from '../SettingsSection';

class TextField extends Component {
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
      <Section className="TextField">
        <label className="TextField__label">
          {label}
        </label>

        <input
            className="TextField__input"
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            placeholder={placeholder}
            value={value}
        />
      </Section>
    );
  }
}

export default TextField;
