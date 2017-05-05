import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Settings, {
  Button,
  Input,
  Section,
  Stepper,
  Toggle
} from '../Settings';

class WallpaperSettings extends Component {
  static propTypes = {
    settings: PropTypes.shape({
      query: PropTypes.string.isRequired,
      featured: PropTypes.bool.isRequired,
      viewTolerance: PropTypes.number.isRequired
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onToggle: Settings.propTypes.onToggle,
    isLoading: PropTypes.bool,
    error: PropTypes.string
  };

  state = {
    query: this.props.settings.query,
    featured: this.props.settings.featured,
    viewTolerance: this.props.settings.viewTolerance,
    error: null
  };

  componentWillReceiveProps(props) {
    const {
      query,
      featured,
      viewTolerance
    } = props.settings;

    const {
      query:oldQuery,
      featured:oldFeatured,
      viewTolerance:oldTolerance
    } = this.props.settings;

    if (query !== oldQuery ||
        featured !== oldFeatured ||
        viewTolerance !== oldTolerance) {
      this.setState({
        query,
        featured,
        viewTolerance
      });
    }
  }

  _handleChangeQuery = (query) => {
    this.setState({ query });
  }

  _handleChangeFeatured = (featured) => {
    this.setState({ featured });
  }

  _handleChangeTolerance = (viewTolerance) => {
    this.setState({ viewTolerance });
  }

  _handleReset = () => {
    const {
      query,
      featured,
      viewTolerance
    } = this.props.settings;

    this.setState({
      error: null,
      viewTolerance,
      featured,
      query
    });
  }

  _handleSave = () => {
    const {
      query,
      featured,
      viewTolerance
    } = this.state;

    const {
      onSave
    } = this.props;

    onSave({
      query,
      featured,
      viewTolerance
    }).then(() => {
      this.popup.toggle(false);
      this.setState({ error: null });
    }).catch((error) => {
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
      featured,
      viewTolerance
    } = this.state;

    const {
      settings,
      isLoading
    } = this.props;

    const error = this.state.error || this.props.error;
    const isDirty = query !== settings.query ||
          featured !== settings.featured ||
          viewTolerance !== settings.viewTolerance;

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

        <Stepper
            label="View Tolerance"
            onChange={this._handleChangeTolerance}
            value={viewTolerance}
            min={1}
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
