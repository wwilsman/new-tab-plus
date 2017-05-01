import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_UNSPLASH_APPID,
  secret: process.env.REACT_APP_UNSPLASH_SECRET,
  callbackUrl: process.env.REACT_APP_UNSPLASH_CALLBACK
});

const serialize = (photo) => ({
  id: photo.id,
  url: photo.urls.custom,
  thumb: photo.urls.thumb,
  download: photo.links.download,
  author: photo.user.name,
  authorUrl: photo.user.links.html,
  source: 'Unsplash',
  sourceUrl: 'https://unsplash.com'
});

export const getRandomPhoto = ({
  query = '',
  featured = true,
  width = 2000,
  count = 30
}) => {
  return unsplash
    .photos.getRandomPhoto({
      query: query.replace(' ', '+'),
      featured,
      width,
      count
    })
    .then((res) => {
      if (res.status === 403) {
        return res.text().then((text) => (
          Promise.reject(text + '.')
        ));
      }

      return res.json();
    })
    .then((data) => {
      if (data.errors) {
        return Promise.reject(data.errors.join(' '));
      }

      return data.map(serialize);
    });
};
