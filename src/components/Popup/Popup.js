import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import './Popup.css';

const positions = ['top', 'right', 'bottom', 'left', 'center'];

class Popup extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['error']),
    position: PropTypes.oneOf(positions),
    alignment: PropTypes.oneOf(positions),
    onClickOutside: PropTypes.func
  };

  static defaultProps = {
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
    const targetInDom = document.body.contains(e.target);

    if (!this._element || !onClickOutside || !targetInDom) {
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
      className,
      children
    } = this.props;

    const rootClassName = [
      'Popup',
      !!type && `Popup--${type}`,
      `Popup--pos-${position}`,
      `Popup--align-${alignment}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={rootClassName}>
        {children}
      </div>
    );
  }
}

export default Popup;
