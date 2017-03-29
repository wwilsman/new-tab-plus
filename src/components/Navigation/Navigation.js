import React, { Component, PropTypes } from 'react';
import './Navigation.css';

import Icon from '../Icon';

class Navigation extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    push: PropTypes.func.isRequired
  };

  _toggleSettings = () => {
    const { location, push } = this.props;
    const settingsPath = '/settings';

    if (location.pathname !== settingsPath) {
      push(settingsPath);
    } else {
      push('/');
    }
  }

  render() {
    return (
      <div className="Nav">
        <button className="Nav__right" onClick={this._toggleSettings}>
          <Icon name="cog" fixed/>
        </button>
      </div>
    );
  }
}

export default Navigation;
