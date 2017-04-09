import React, { Component, PropTypes } from 'react';

import Settings from '../Settings';
import TextField from '../TextField';
import ToggleField from '../ToggleField';

class WallpaperSettings extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired
    }).isRequired,
    saveSettings: PropTypes.func.isRequired,
    onToggle: Settings.propTypes.onToggle
  };

  state = {
    query: this.props.settings.query,
    featured: this.props.settings.featured
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

    this.props.saveSettings({
      featured,
      query
    });
  }

  render() {
    const {
      query,
      featured
    } = this.state;

    const {
      onToggle
    } = this.props;

    const {
      query:ogQuery,
      featured:ogFeatured
    } = this.props.settings;

    const isDirty = query !== ogQuery ||
          featured !== ogFeatured;

    return (
      <Settings
          onToggle={onToggle}
          popupPosition="top"
          popupAlignment="left">
        <TextField
            label="Query"
            placeholder="nature"
            onChangeText={this._handleChangeQuery}
            value={query}
        />

        <ToggleField
            label="Featured"
            onChange={this._handleChangeFeatured}
            value={featured}
        />

        {!!isDirty && (
          <button onClick={this._handleSave}>
            save
          </button>
        )}
      </Settings>
    )
  }
}

export default WallpaperSettings;
