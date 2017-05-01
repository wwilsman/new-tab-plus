import React, { Component, PropTypes } from 'react';

import Icon from '../Icon';
import Settings, {
  Button,
  Input,
  Section,
  Toggle
} from '../Settings';

class WallpaperSettings extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onToggle: Settings.propTypes.onToggle,
    isLoading: PropTypes.bool,
    error: PropTypes.string
  };

  state = {
    query: this.props.settings.query,
    featured: this.props.settings.featured,
    error: null
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
      error: null,
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
      onSave
    } = this.props;

    onSave({ query, featured })
      .then(() => {
        this.popup.toggle(false);
        this.setState({ error: null });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  _handleToggle = (isVisible) => {
    if (this.props.onToggle) {
      this.props.onToggle(isVisible);
    }
  }

  render() {
    const {
      query,
      featured
    } = this.state;

    const {
      settings,
      isLoading
    } = this.props;

    const error = this.state.error || this.props.error;
    const isDirty = query !== settings.query ||
          featured !== settings.featured;

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

        <Input
            label="Query"
            placeholder="nature, animals, etc."
            onChangeText={this._handleChangeQuery}
            value={query}
        />

        <Toggle
            label="Featured"
            onChange={this._handleChangeFeatured}
            value={featured}
        />

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
