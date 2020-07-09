module.exports = (body, allowInsert) => {
  const insertData = Object.keys(body);
  const isValid = insertData.every(item => allowInsert.includes(item));

  if (!isValid) {
    return true;
  }
  return false;
};
