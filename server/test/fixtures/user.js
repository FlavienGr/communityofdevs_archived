// eslint-disable-next-line
const db = require('../../db/index');
const tableUser = require('../../constants/tableUser');

const userOne = {
  email: 'user-test@fake.com',
  password: 'testPassword',
  name: 'user-test',
  immatriculation: 'user-test-dou',
  cgu: true,
  street: 'boulevard de user-test',
  city: 'Bordeaux',
  state: 'Gironde',
  country: 'France'
};
const userLogin = {
  email: 'user-test@fake.com',
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
