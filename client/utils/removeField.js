export default (data, field) => {
  const copy = { ...data };
  const newObj = Object.keys(data).reduce((obj, key) => {
    if (key !== field) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = copy[key];
    }
    return obj;
  }, {});
  return newObj;
};
