import React, { Component, PropTypes } from 'react';

import Button from '../Button';
import Icon from '../Icon';
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
    isLoading: false,
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

  _handleReset = () => {
    const {
      query,
      featured
    } = this.props.settings

    this.setState({
      errors: null,
      featured,
      query
    });
  }

  _handleSave = () => {
    const {
      query,
      featured
    } = this.state;

    const {
      onTrySettings
    } = this.props;

    this.setState({
      isLoading: true
    });

    onTrySettings({
      query,
      featured
    }, (errors) => {
      if (!errors && this.popup) {
        this.popup.toggle(false);
      } else if (errors) {
        this.setState({ errors });
      }

      this.setState({
        isLoading: false
      });
    });
  }

  _handleToggle = (isVisible) => {
    const {
      onToggle
    } = this.props;

    if (!isVisible) {
      this._handleReset();
    }

    if (onToggle) {
      onToggle(isVisible);
    }
  }

  render() {
    const {
      query,
      featured,
      isLoading,
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
            <Button
                onClick={this._handleReset}
                disabled={isLoading}
                unimportant>
              reset
            </Button>

            <Button
                onClick={this._handleSave}
                disabled={isLoading}>
              {!!isLoading ? (
                <Icon name="circle-o-notch" spin/>
              ) : 'save'}
            </Button>
          </Section>
        )}
      </Settings>
    )
  }
}

export default WallpaperSettings;
