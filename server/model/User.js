const db = require('../db/index');
const tableUser = require('../constants/tableUser');

const findByEmail = (email, password) => {
  if (password) {
    return db(tableUser.user)
      .select('id', 'name', 'email', 'password')
      .where({ email })
      .first();
  }
  return db(tableUser.user)
    .select('id', 'name', 'email')
    .where({ email })
    .first();
};

module.exports = {
  findByEmail
};
