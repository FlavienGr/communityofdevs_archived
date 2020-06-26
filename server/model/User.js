const db = require('../db/index');
const tableUser = require('../constants/tableUser');
const findByEmailLogin = email => {
  return db(tableUser.user)
    .select('id', 'name', 'email', 'password')
    .where({ email })
    .first();
};
const findByEmail = email => {
  return db(tableUser.user)
    .select('id', 'name', 'email')
    .where({ email })
    .first();
};
const signup = async (data, hashPassword) => {
  const { email, name } = data;

  return db(tableUser.user).insert(
    {
      email,
      password: hashPassword,
      name
    },
    ['id', 'email', 'name']
  );
};
module.exports = {
  findByEmailLogin,
  findByEmail,
  signup
};
