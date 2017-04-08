import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import './Settings.css';

import Icon from '../Icon';

const positions = ['top', 'right', 'bottom', 'left', 'center'];

class Settings extends Component {
  static propTypes = {
    modalPosition: PropTypes.oneOf(positions),
    modalAlignment: PropTypes.oneOf(positions),
    toggleIcon: PropTypes.string
  };

  static defaultProps = {
    modalPosition: 'center',
    modalAlignment: 'center',
    toggleIcon: 'cog'
  };

  state = {
    isShown: false
  };

  componentDidMount() {
    this._registerOutsideClick();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  componentWillReceiveProps({ show }) {
    const { isShown } = this.state;
    const isShowUndefined = show === undefined;

    this.setState({
      isShown: isShowUndefined ? isShown : !!show,
      showToggle: isShowUndefined
    });
  }

  componentDidUpdate() {
    this._registerOutsideClick();
  }

  _registerOutsideClick = () => {
    if (this.state.isShown) {
      this._element = findDOMNode(this);
      document.addEventListener('click', this._handleOutsideClick);
    } else {
      this._element = null;
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _handleOutsideClick = (e) => {
    if (!this._element) return;

    const isNotTarget = this._element !== e.target;
    const doesNotContainTarget = !this._element.contains(e.target);

    if (isNotTarget && doesNotContainTarget) {
      e.preventDefault();

      this.setState({
        isShown: false
      });
    }
  }

  _handleToggle = () => {
    this.toggle();
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
      modalPosition,
      modalAlignment,
      toggleIcon,
      children
    } = this.props;

    const rootClassName = [
      'Settings',
      !!isShown && 'Settings--is-shown',
    ].filter(Boolean).join(' ');
    
    const modalClassName = [
      'Settings__modal',
      `Settings__modal--pos-${modalPosition}`,
      `Settings__modal--align-${modalAlignment}`,
    ].join(' ');

    return (
      <div className={rootClassName}>
        <button
            className="Settings__toggle"
            onClick={this._handleToggle}>
          <Icon name={toggleIcon} fixed/>
        </button>

        {!!isShown && (
          <div className={modalClassName}>
            {children}
          </div>
        )}
      </div>
    );
  }
}

export default Settings;
