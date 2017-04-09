import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import './Popup.css';

const popupTypes = ['default', 'error'];
const positions = ['top', 'right', 'bottom', 'left', 'center'];

class Popup extends Component {
  static propTypes = {
    type: PropTypes.oneOf(popupTypes),
    position: PropTypes.oneOf(positions),
    alignment: PropTypes.oneOf(positions),
    onClickOutside: PropTypes.func
  };

  static defaultProps = {
    type: 'default',
    position: 'center',
    alignment: 'center'
  };

  componentDidMount() {
    if (this.props.onClickOutside) {
      this._element = findDOMNode(this);
      document.addEventListener('click', this._handleOutsideClick);
    }
  }

  componentWillUnmount() {
    if (this.props.onClickOutside) {
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _handleOutsideClick = (e) => {
    const { onClickOutside } = this.props;

    if (!this._element || !onClickOutside) {
      return;
    }

    const isNotTarget = this._element !== e.target;
    const doesNotContainTarget = !this._element.contains(e.target);

    if (isNotTarget && doesNotContainTarget) {
      e.preventDefault();
      onClickOutside(e);
    }
  }

  render() {
    const {
      type,
      position,
      alignment,
      children
    } = this.props;

    const className = [
      'Popup',
      `Popup--${type}`,
      `Popup--pos-${position}`,
      `Popup--align-${alignment}`,
    ].join(' ');

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default Popup;
