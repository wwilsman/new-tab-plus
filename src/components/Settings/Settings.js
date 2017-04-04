import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import './Settings.css';

import Icon from '../Icon';

class Settings extends Component {
  static propTypes = {
    modalPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    modalAlignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired
  }

  state = {
    show: false
  }

  componentDidMount() {
    this._element = findDOMNode(this);
    document.addEventListener('click', this._handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick = (e) => {
    const isVisible = this.state.show;
    const isNotTarget = this._element !== e.target;
    const doesNotContainTarget = !this._element.contains(e.target);

    if (isVisible && isNotTarget && doesNotContainTarget) {
      e.preventDefault();

      this.setState({
        show: false
      });
    }
  }

  toggle = () => {
    this.setState(({ show }) => ({
      show: !show
    }))
  }

  render() {
    const {
      show
    } = this.state;

    const {
      className,
      modalPosition,
      modalAlignment,
      children
    } = this.props;

    const baseClassName = [
      'Settings',
      !!show && 'Settings--is-shown',
      className
    ].filter(Boolean).join(' ');

    const modalClassName = [
      'Settings__modal',
      `Settings__modal--position-${modalPosition}`,
      `Settings__modal--align-${modalAlignment}`,
    ].join(' ');

    return (
      <div className={baseClassName}>
        <button className="Settings__toggle" onClick={this.toggle}>
          <Icon name="cog" fixed/>
        </button>

        {!!show && (
           <div className={modalClassName}>
             {children}
           </div>
         )}
      </div>
    )
  }
}

export default Settings;
