import { REHYDRATE } from 'redux-persist/constants';

const stateHasPhoto = (state, id) => {
  return !!state.find((photo) => photo.id === id);
};

const photosReducer = (state = [], action) => {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.photos) {
        return [
          ...state,
          ...action.payload.photos
        ].reduce((state, photo) => {
          if (!stateHasPhoto(state, photo.id)) {
            state.push(photo);
          }

          return state;
        }, []).slice(0, 51);
      }

      return state;

    case 'CACHE_PHOTO':
      if (!stateHasPhoto(state, action.data.id)) {
        return [action.data, ...state].slice(0, 51);
      }

      return state;

    default:
      return state;
  }
};

export default photosReducer;
