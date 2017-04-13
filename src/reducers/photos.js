const stateHasPhoto = (state, id) => {
  return !!state.find((photo) => photo.id === id);
};

const photosReducer = (state = [], action) => {
  switch (action.type) {
    case 'CACHE_PHOTO':
      if (!stateHasPhoto(state, action.photo.id)) {
        return [action.photo, ...state].slice(0, 51);
      }

      return state;

    default:
      return state;
  }
};

export default photosReducer;
