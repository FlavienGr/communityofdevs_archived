const reduceObject = (data, field) => {
  const obj = Object.keys(data).reduce((object, key) => {
    if (!field.includes(key)) {
      object[key] = data[key];
    }
    return object;
  }, {});
  return obj;
};
module.exports = reduceObject;
