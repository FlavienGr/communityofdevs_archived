// eslint-disable-next-line
const db = require('../../db/index');
const tableUser = require('../../constants/tableUser');

const userOne = {
  name: 'usertest',
  email: 'usertest@fake.com',
  password: '123456789'
};
const userLogin = {
  email: 'usertest@fake.com',
  password: '123456789'
};

const deleteAllinUserTables = async () => {
  await db(tableUser.user).del();
};

module.exports = {
  userOne,
  userLogin,
  deleteAllinUserTables
};
