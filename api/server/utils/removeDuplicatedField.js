const removeDuplicateField = (data, user) => {
  const response = Object.keys(data).reduce((obj, key) => {
    if (data[key] !== user[key]) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = data[key];
    }
    return obj;
  }, {});
  return response;
};

module.exports = removeDuplicateField;
