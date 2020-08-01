// eslint-disable-next-line
const db = require('../../db/index');
const tableUser = require('../../constants/tableUser');
const tableProject = require('../../constants/tableProject');

const userOne = {
  email: 'user-test@fake.com',
  password: 'testPassword',
  name: 'user-test',
  immatriculation: 'user-test',
  cgu: true
};
const userUpdate = {
  immatriculation: 'user-test-dou',
  name: 'user-test',
  city: 'Paris',
  state: 'Paris',
  country: 'France',
  zipcode: '75001'
};
const userLogin = {
  email: 'user-test@fake.com',
  password: 'testPassword'
};
const changeEmail = {
  email: 'user-test-changed@fake.com',
  emailConfirmation: 'user-test-changed@fake.com',
  password: 'testPassword'
};
const changePassword = {
  oldPassword: 'testPassword',
  password: 'changedPassword',
  passwordConfirmation: 'changedPassword'
};
const project = {
  name: 'the best project',
  summary:
    "Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has"
};
const deleteAllinUserTables = async () => {
  await db(tableUser.user).del();
};
const deleteAllinProjectTables = async () => {
  await db(tableProject.project).del();
};
const createUser = async () => {
  await db(tableUser.user).insert(userOne);
};
module.exports = {
  userOne,
  userLogin,
  userUpdate,
  project,
  deleteAllinUserTables,
  deleteAllinProjectTables,
  createUser,
  changeEmail,
  changePassword
};
