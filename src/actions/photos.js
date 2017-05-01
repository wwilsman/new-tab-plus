import { getRandomPhoto } from '../utils/unsplash';

const requestPhotos = () => ({
  type: 'REQUEST_PHOTOS'
});

const requestPhotosFailed = (error) => ({
  type: 'REQUEST_PHOTOS_FAILED',
  photos: {
    error
  }
});

const receivePhotos = (data) => ({
  type: 'RECEIVE_PHOTOS',
  photos: {
    data
  }
});

export const viewPhoto = (id) => ({
  type: 'VIEW_PHOTO',
  photo: {
    id
  }
});

export const fetchPhotos = (settings, supressError) => {
  return (dispatch) => {
    dispatch(requestPhotos());
    return getRandomPhoto(settings)
      .then((data) => {
        dispatch(receivePhotos(data));
        return data;
      })
      .catch((error) => {
        dispatch(requestPhotosFailed(!supressError && error));
        return Promise.reject(error);
      });
  };
};
