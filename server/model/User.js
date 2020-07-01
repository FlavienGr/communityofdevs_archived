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
const findById = id => {
  return db(tableUser.user)
    .select('id')
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
      'a.street_address_1 as street',
      'ci.name as city',
      'ci.zipcode',
      's.name as state',
      'co.name as country'
    )
    .leftJoin(`${tableUser.user_address} AS a`, { 'a.user_id': 'u.id' })
    .leftJoin(`${tableUser.user_state} AS s`, { 's.id': 'a.user_state_id' })
    .leftJoin(`${tableUser.user_city} AS ci`, { 'ci.id': 'a.user_city_id' })
    .leftJoin(`${tableUser.user_country} AS co`, {
      'co.id': 'a.user_country_id'
    })
    .where({ 'u.id': id })
    .first();

  return user;
};
const getElementID = async (element, table) => {
  const { id } = await db(`${`user_${table}`}`)
    .select('id')
    .where({ name: element })
    .first();

  return id;
};
const createNewAddress = async data => {
  const address = removeField(data, userItems);
  const updateAddress = {};
  if (address.country) {
    updateAddress.user_country_id = await getElementID(
      address.country,
      'country'
    );
  }
  if (address.state) {
    updateAddress.user_state_id = await getElementID(address.state, 'state');
  }
  if (address.city) {
    updateAddress.user_city_id = await getElementID(address.city, 'city');
  }
  if (address.street) {
    updateAddress.street_address_1 = address.street;
  }
  return updateAddress;
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

  const address = await createNewAddress(data);
  address.user_id = user[0].id;

  await db(tableUser.user_address).insert(address);

  return getProfileUserById(user[0].id);
};

const updateById = async (data, id) => {
  const isAddressChanged = Object.keys(data).some(item =>
    addressItems.includes(item)
  );
  let updateUser = { ...data };

  if (isAddressChanged) {
    const updatesAddress = await createNewAddress(data);
    await db(tableUser.user_address)
      .where({ user_id: id })
      .update(updatesAddress);

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
module.exports = {
  findByEmailLogin,
  findByEmail,
  signup,
  updateById,
  getProfileUserById,
  deleteUserById,
  findById
};
