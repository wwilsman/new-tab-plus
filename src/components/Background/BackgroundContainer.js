import { connect } from 'react-redux';
import { cachePhoto } from '../../actions/photos';

import Background from './Background';

const BackgroundContainer = connect(
  (state) => ({
    cache: state.photos
  }), {
    cachePhoto
  }, null, {
    pure: false
  }
)(Background);

export default BackgroundContainer;
