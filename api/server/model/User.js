const db = require('../db/index');
const tableUser = require('../constants/tableUser');
const removeField = require('../utils/removeField');
const { userItems, addressItems } = require('../constants/itemsToRemove');

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
const findByName = name => {
  return db(tableUser.user)
    .select('id')
    .where({ name })
    .first();
};
const findById = id => {
  return db(tableUser.user)
    .select('id')
    .where({ id })
    .first();
};
const findByIdPassword = id => {
  return db(tableUser.user)
    .select('id', 'password')
    .where({ id })
    .first();
};
const getProfileUserById = async id => {
  const user = await db(`${tableUser.user} AS u`)
    .select(
      'u.id',
      'u.email',
      'u.name',
      'u.immatriculation',
      'a.street',
      'a.city',
      'a.zipcode',
      'a.state',
      'a.country'
    )
    .leftJoin(`${tableUser.user_address} AS a`, { 'a.user_id': 'u.id' })
    .where({ 'u.id': id })
    .first();

  return user;
};

const signup = async (data, hashPassword) => {
  const { email, name, immatriculation } = data;

  const user = await db(tableUser.user).insert(
    {
      email,
      password: hashPassword,
      name,
      immatriculation
    },
    ['id', 'email', 'name']
  );
  await db(tableUser.user_address).insert({ user_id: user[0].id }, ['id']);

  return getProfileUserById(user[0].id);
};
const createAddressById = async (id, data) => {
  return (
    await db(tableUser.user_address)
      .where({ user_id: id })
      .update(data),
    ['id']
  );
};
const updateById = async (data, id) => {
  const isAddressChanged = Object.keys(data).some(item =>
    addressItems.includes(item)
  );
  let updateUser = { ...data };

  if (isAddressChanged) {
    const newAddress = removeField(data, userItems);
    await createAddressById(id, newAddress);
    updateUser = removeField(updateUser, addressItems);
  }

  await db(tableUser.user)
    .where({ id })
    .update(updateUser);

  return getProfileUserById(id);
};
const deleteUserById = id => {
  return db(tableUser.user)
    .where({ id })
    .del();
};
const getCurrentUser = id => {
  return db(tableUser.user)
    .select('id', 'name')
    .where({ id })
    .first();
};
const updateEmail = (email, id) => {
  return db(tableUser.user)
    .where({ id })
    .update({ email })
    .returning(['id', 'name', 'email']);
};
module.exports = {
  findByEmailLogin,
  findByEmail,
  findByName,
  signup,
  updateById,
  getProfileUserById,
  deleteUserById,
  findById,
  getCurrentUser,
  findByIdPassword,
  updateEmail
};
