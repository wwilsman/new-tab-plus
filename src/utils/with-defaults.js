function isPojo(obj) {
  return obj !== null && typeof obj === 'object' &&
    Object.getPrototypeOf(obj) === Object.prototype;
}

function withDefaults(obj, defObj, deep) {
  return Object.keys(defObj).reduce((ret, key) => {
    if (deep && isPojo(obj[key])) {
      ret[key] = withDefaults(obj[key], defObj[key]);
    } else {
      ret[key] = obj[key] || defObj[key];
    }

    return ret;
  }, {});
}

export default withDefaults;
