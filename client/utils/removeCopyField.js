export default (origin, data) => {
  const newobj = Object.keys(origin).reduce((obj, key) => {
    const correctKey = key === 'name' || key === 'summary';
    if (correctKey && data[key] !== origin[key]) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = data[key];
    }
    return obj;
  }, {});
  return newobj;
};
