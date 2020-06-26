const db = require('../db/index');
const tableUser = require('../constants/tableUser');

const findByEmailLogin = email => {
  return db(tableUser.user)
    .select('id', 'name', 'email', 'password')
    .where({ email })
    .first();
};

module.exports = {
  findByEmailLogin
};
