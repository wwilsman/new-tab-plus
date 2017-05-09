import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Settings, {
  Button,
  Input,
  Section,
  Upload
} from '../Settings';

class ShortcutSettings extends Component {
  static propTypes = {
    onCreateShortcut: PropTypes.func.isRequired
  };

  state = {
    newShortcut: {
      name: '',
      icon: '',
      url: ''
    }
  };

  _handleSetNewName = (name) => {
    this.setNewShortcut({ name });
  }

  _handleSetNewIcon = (icon) => {
    this.setNewShortcut({ icon });
  }

  _handleSetNewUrl = (url) => {
    this.setNewShortcut({ url });
  }

  _handleCancel = () => {
    this.setNewShortcut({
      name: '',
      icon: '',
      url: ''
    });

    if (this.popup) {
      this.popup.toggle(false);
    }
  }

  _handleNewShortcut = () => {
    const { onCreateShortcut } = this.props;
    const { newShortcut } = this.state;

    onCreateShortcut(newShortcut);

    if (this.popup) {
      this.popup.toggle(false);
    }
  }

  setNewShortcut(props) {
    this.setState(({ newShortcut }) => ({
      newShortcut: {
        ...newShortcut,
        ...props
      }
    }));
  }

  isValidShortcut(shortcut) {
    return
  }

  render() {
    const { newShortcut } = this.state;

    const isDirty = (
      newShortcut.name !== '' ||
      newShortcut.icon !== '' ||
      newShortcut.url !== ''
    );

    const isValidShortcut = (
      newShortcut.name &&
      newShortcut.icon &&
      newShortcut.url
    );

    return (
      <Settings
          ref={(ref) => this.popup = ref}
          popupPosition="center"
          popupAlignment="center"
          toggleIcon="plus">
        <Upload
            label="Icon"
            onUpload={this._handleSetNewIcon}
            fileTypes={['image/png']}
            preview={newShortcut.icon}
            text="Choose an image"
        />

        <Input
            label="Name"
            onChangeText={this._handleSetNewName}
            placeholder="Twitter"
            value={newShortcut.name}
        />

        <Input
            label="URL"
            onChangeText={this._handleSetNewUrl}
            placeholder="https://twitter.com"
            value={newShortcut.url}
        />

        {isDirty && (
          <Section>
            <Button
                onClick={this._handleCancel}
                unimportant>
              cancel
            </Button>

            <Button
                onClick={this._handleNewShortcut}
                disabled={!isValidShortcut}>
              create
            </Button>
          </Section>
        )}
      </Settings>
    );
  }
}

export default ShortcutSettings;
