// eslint-disable-next-line
const db = require('../../db/index');
const tableUser = require('../../constants/tableUser');

const userOne = {
  username: 'superuser',
  email: 'superuser@fake.com',
  password: '123456789',
  passwordConfirmation: '123456789'
};
const userLogin = {
  email: 'firstuser@fake.com',
  password: 'testPassword'
};

const deleteAllinUserTables = async () => {
  await db(tableUser.user).del();
};

module.exports = {
  userOne,
  userLogin,
  deleteAllinUserTables
};
