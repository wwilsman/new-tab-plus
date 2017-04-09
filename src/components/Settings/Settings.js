import React, { Children, Component, PropTypes } from 'react';
import './Settings.css';

import Icon from '../Icon';
import Popup from '../Popup';

class Settings extends Component {
  static propTypes = {
    popupPosition: Popup.propTypes.position,
    popupAlignment: Popup.propTypes.alignment,
    toggleIcon: PropTypes.string
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
    this.setState(({ isShown }) => ({
      isShown: typeof value === 'boolean' ? value : !isShown
    }));
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
            {Children.map(children, (child) => !!child && (
              <div className="Settings__section">
                {child}
              </div>
            ))}
          </Popup>
        )}
      </div>
    );
  }
}

export default Settings;
