module.exports = (data, item) => {
  const newUpdates = Object.keys(data).reduce((object, key) => {
    if (!item.includes(key)) {
      // eslint-disable-next-line no-param-reassign
      object[key] = data[key];
    }
    return object;
  }, {});
  return newUpdates;
};
