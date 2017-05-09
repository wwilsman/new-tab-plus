import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Section from './Section';
import './Settings.css';

class SettingsUpload extends Component {
  static propTypes = {
    preview: PropTypes.string,
    onUpload: PropTypes.func,
    fileTypes: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    if (this.props.preview) {
      this.drawImage(this.props.preview).then(() => {
        this.setState({
          isLoading: false
        });
      });
    }
  }

  _handleClick = () => {
    if (this.input) {
      this.input.click();
    }
  }

  _handleDrag = (e) => {
    e.preventDefault();
  }

  _handleUpload = (e) => {
    const file = e.dataTransfer ?
          e.dataTransfer.files[0] :
          e.target.files[0];

    if (!this.isFileAllowed(file)) return;

    e.preventDefault();

    if (this.input) {
      this.input.value = '';
    }

    this.setState({
      isLoading: true
    });

    const reader = new FileReader();

    reader.onload = ({ target }) => {
      this.drawImage(target.result).then(() => {
        this.props.onUpload(target.result);

        this.setState({
          isLoading: false
        });
      });
    };

    reader.readAsDataURL(file);
  }

  isFileAllowed(file) {
    const { fileTypes } = this.props;
    return !!file && fileTypes.includes(file.type);
  }

  drawImage(url) {
    return new Promise((resolve, reject) => {
      if (!this.canvas) {
        reject('canvas is unavailable');
        return;
      }

      const ctx = this.canvas.getContext('2d');
      let img = new Image();

      img.onerror = reject;
      img.onload = () => {
        const max = Math.max(img.width, img.height);
        this.canvas.width = this.canvas.height = max;

        ctx.drawImage(img,
          (max - img.width) / 2,
          (max - img.height) / 2
        );

        img = null;
        resolve();
      };

      img.src = url;
    });
  }

  render() {
    const {
      label,
      preview,
      fileTypes,
      text
    } = this.props;

    const {
      isLoading
    } = this.state;

    const className = [
      'Settings__upload-field',
      !preview && 'Settings__upload-field--no-preview',
      isLoading && 'Settings__upload-field--is-loading'
    ].filter(Boolean).join(' ');

    return (
      <Section alignItems="end">
        <label className="Settings__label">
          {label}
        </label>

        <div
            className={className}
            onClick={this._handleClick}
            onDragOver={this._handleDrag}
            onDrop={this._handleUpload}>
          <canvas ref={(ref) => this.canvas = ref}/>

          <input
              ref={(ref) => this.input = ref}
              className="Settings__upload-field__input"
              onChange={this._handleUpload}
              accept={fileTypes.join(',')}
              type="file"
          />

          {!preview && (
            <span className="Settings__upload-field__text">
              {text}
            </span>
          )}
        </div>
      </Section>
    );
  }
}

export default SettingsUpload;
