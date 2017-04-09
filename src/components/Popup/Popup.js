import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import './Popup.css';

const positions = ['top', 'right', 'bottom', 'left', 'center'];

class Popup extends Component {
  static propTypes = {
    position: PropTypes.oneOf(positions),
    alignment: PropTypes.oneOf(positions),
    onClickOutside: PropTypes.func
  };

  static defaultProps = {
    position: 'center',
    alignment: 'center'
  };

  componentDidMount() {
    this._element = findDOMNode(this);
    document.addEventListener('click', this._handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleOutsideClick);
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
      position,
      alignment,
      children
    } = this.props;

    const className = [
      'Popup',
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
