// eslint-disable-next-line
const db = require('../../db/index');
const tableUser = require('../../constants/tableUser');
const tableProject = require('../../constants/tableProject');

const userOne = {
  email: 'user-test@fake.com',
  password: 'testPassword',
  name: 'user-test',
  immatriculation: 'user-test',
  cgu: true,
  street: 'boulevard de user-test',
  city: 'Bordeaux',
  state: 'Gironde',
  country: 'France',
  zipcode: '33000'
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

module.exports = {
  userOne,
  userLogin,
  userUpdate,
  project,
  deleteAllinUserTables,
  deleteAllinProjectTables
};
