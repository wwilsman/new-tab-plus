import { createTransform } from 'redux-persist';

const initialPhotoState = {
  id: '',
  url: '',
  thumb: '',
  download: '',
  author: '',
  authorUrl: '',
  source: '',
  sourceUrl: '',
  viewed: 0
};

const photoReducer = (
  state = initialPhotoState,
  action
) => {
  switch (action.type) {
    case 'RECEIVE_PHOTOS':
      return {
        ...initialPhotoState,
        ...state
      };

    case 'VIEW_PHOTO':
      if (state.id !== action.photo.id) {
        return state;
      }

      return {
        ...state,
        viewed: state.viewed + 1
      };

    default:
      return state;
  }
};

const initialPhotosState = {
  loading: false,
  error: false,
  data: []
};

export const transform = createTransform(
  (inbound) => ({
    data: inbound.data
  }),
  (outbound) => ({
    ...initialPhotosState,
    data: outbound.data
  }), {
    whitelist: ['photos']
  }
);

export const reducer = (
  state = initialPhotosState,
  action
) => {
  switch (action.type) {
    case 'REQUEST_PHOTOS':
      return {
        ...state,
        loading: true,
        error: false
      };

    case 'REQUEST_PHOTOS_FAILED':
      return {
        ...state,
        loading: false,
        error: action.photos.error || state.error
      };

    case 'RECEIVE_PHOTOS':
      return {
        ...state,
        error: false,
        loading: false,
        data: action.photos.data.map((photo) => (
          photoReducer(photo, action)
        ))
      };

    case 'VIEW_PHOTO':
      return {
        ...state,
        data: state.data.map((photo) => (
          photoReducer(photo, action)
        ))
      };

    default:
      return state;
  }
};
