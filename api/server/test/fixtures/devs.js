// eslint-disable-next-line
const db = require('../../db/index');
const tableDevs = require('../../constants/tableDevs');

const userOne = {
  email: 'user-test@fake.com',
  login: 'tester',
  name: 'user-test',
  location: 'paris',
  blog: 'www.letester.fake'
};
const userUpdate = {
  email: 'user-test-update@fake.com',
  username: 'tester-update',
  name: 'user-test-update',
  location: 'paris',
  blog: 'www.letester.fake'
};

const deleteAllinUserTables = async () => {
  await db(tableDevs.devs).del();
};

const createDev = async () => {
  await db(tableDevs.devs).insert(userOne);
};
module.exports = {
  userOne,
  deleteAllinUserTables,
  createDev,
  userUpdate
};
