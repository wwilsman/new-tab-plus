import React, { Component, PropTypes } from 'react';

import Settings from '../Settings';
import Section from '../SettingsSection';
import TextField from '../TextField';
import ToggleField from '../ToggleField';

class WallpaperSettings extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired
    }).isRequired,
    onTrySettings: PropTypes.func.isRequired,
    onToggle: Settings.propTypes.onToggle,
    error: PropTypes.string
  };

  state = {
    query: this.props.settings.query,
    featured: this.props.settings.featured,
    errors: null
  };

  componentWillReceiveProps(props) {
    const {
      query,
      featured
    } = props.settings;

    const {
      query:oldQuery,
      featured:oldFeatured
    } = this.props.settings;

    if (query !== oldQuery || featured !== oldFeatured) {
      this.setState({ featured, query });
    }
  }

  _handleChangeQuery = (query) => {
    this.setState({ query });
  }

  _handleChangeFeatured = (featured) => {
    this.setState({ featured });
  }

  _handleSave = () => {
    const {
      query,
      featured
    } = this.state;

    const {
      onTrySettings
    } = this.props;

    onTrySettings({
      query,
      featured
    }, (errors) => {
      if (!errors && this.popup) {
        this.popup.toggle(false);
      } else if (errors) {
        this.setState({ errors });
      }
    });
  }

  _handleToggle = (isVisible) => {
    const {
      settings,
      onToggle
    } = this.props;

    if (!isVisible) {
      this.setState({
        query: settings.query,
        featured: settings.featured,
        errors: null
      });
    }

    if (onToggle) {
      onToggle(isVisible);
    }
  }

  render() {
    const {
      query,
      featured,
      errors
    } = this.state;

    const {
      query:ogQuery,
      featured:ogFeatured
    } = this.props.settings;

    const isDirty = query !== ogQuery ||
          featured !== ogFeatured;

    const error = (errors && errors.length) ?
          errors.join(' ') : this.props.error;

    return (
      <Settings
          ref={(s) => this.popup = s}
          onToggle={this._handleToggle}
          popupPosition="top"
          popupAlignment="left">
        {!!error && (
          <Section type="error">
            <p>{error}</p>
          </Section>
        )}

        <Section>
          <TextField
              label="Query"
              placeholder="nature, animals, etc."
              onChangeText={this._handleChangeQuery}
              value={query}
          />
        </Section>

        <Section>
          <ToggleField
              label="Featured"
              onChange={this._handleChangeFeatured}
              value={featured}
          />
        </Section>

        {!!isDirty && (
          <Section>
            <button onClick={this._handleSave}>
              save
            </button>
          </Section>
        )}
      </Settings>
    )
  }
}

export default WallpaperSettings;
