import React, { Component, PropTypes } from 'react';
import './Settings.css';

import Icon from '../Icon';
import Popup from '../Popup';

class Settings extends Component {
  static propTypes = {
    popupPosition: Popup.propTypes.position,
    popupAlignment: Popup.propTypes.alignment,
    toggleIcon: PropTypes.string,
    onToggle: PropTypes.func
  };

  static defaultProps = {
    toggleIcon: 'cog'
  };

  state = {
    isShown: false
  };

  componentWillReceiveProps({ show }) {
    if (show !== undefined) {
      this.setState({
        isShown: !!show
      });
    }
  }

  _handleToggle = () => {
    this.toggle();
  }

  _handleHide = () => {
    this.toggle(false);
  }

  toggle(value) {
    const { onToggle } = this.props;

    this.setState(({ isShown }) => {
      isShown = typeof value === 'boolean' ? value : !isShown
      onToggle && onToggle(isShown);
      return { isShown };
    });
  }

  render() {
    const {
      isShown
    } = this.state;

    const {
      popupPosition,
      popupAlignment,
      toggleIcon,
      children
    } = this.props;

    const rootClassName = [
      'Settings',
      !!isShown && 'Settings--is-shown',
    ].filter(Boolean).join(' ');

    return (
      <div className={rootClassName}>
        <button
            className="Settings__toggle"
            onClick={this._handleToggle}>
          <Icon name={toggleIcon} fixed/>
        </button>

        {!!isShown && (
          <Popup
              position={popupPosition}
              alignment={popupAlignment}
              onClickOutside={this._handleHide}>
            {children}
          </Popup>
        )}
      </div>
    );
  }
}

export default Settings;
