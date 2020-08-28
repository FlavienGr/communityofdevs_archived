const db = require('../db/index');
const tableDevs = require('../constants/tableDevs');

const getCurrentUser = id => {
  return db(tableDevs.devs)
    .select('id')
    .where({ id })
    .first();
};
const findById = id => {
  return db(tableDevs.devs)
    .select('id', 'email')
    .where({ id })
    .first();
};
const signup = async data => {
  let insertData = {};
  const requiredData = ['name', 'email', 'html_url', 'location', 'id', 'blog'];
  for (item of requiredData) {
    if (data[item]) {
      insertData[item] = data[item];
    }
  }

  const user = await db(tableDevs.devs).insert(insertData, ['id']);

  return user;
};
module.exports = {
  getCurrentUser,
  findById,
  signup
};
