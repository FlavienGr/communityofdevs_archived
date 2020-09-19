const db = require('../db/index');
const tableDevs = require('../constants/tableDevs');
const tableProject = require('../constants/tableProject');

const getCurrentUser = id => {
  return db(tableDevs.devs)
    .select('id')
    .where({ id })
    .first();
};
const findById = id => {
  return db(tableDevs.devs)
    .select('id', 'email')
    .where({ id })
    .first();
};
const signup = async data => {
  let insertData = {};
  const requiredData = [
    'name',
    'email',
    'html_url',
    'location',
    'id',
    'blog',
    'login'
  ];
  for (item of requiredData) {
    if (data[item]) {
      insertData[item] = data[item];
    }
  }

  const user = await db(tableDevs.devs).insert(insertData, ['id']);

  return user;
};
const getProfileDevById = async id => {
  const dev = await db(`${tableDevs.devs} AS d`)
    .select(
      'd.id',
      'd.email',
      'd.name',
      'd.blog',
      'd.location',
      'd.html_url',
      'd.login'
    )
    .where({ 'd.id': id })
    .first();

  return dev;
};
const findByUsername = username => {
  return db(tableDevs.devs)
    .select('id')
    .where({ login: username })
    .first();
};

const updateById = async (data, id) => {
  let updateUser = { ...data };

  for (item in updateUser) {
    if (!updateUser[item]) {
      updateUser[item] = null;
    }
  }
  if (Object.keys(updateUser).length > 0) {
    await db(tableDevs.devs)
      .where({ id })
      .update(updateUser);
  }
  return getProfileDevById(id);
};
const signupForTest = async data => {
  const user = await db(tableDevs.devs).insert(data, ['id']);
  return getProfileDevById(user[0].id);
};
const deleteDevsById = id => {
  return db(tableDevs.devs)
    .where({ id })
    .del();
};
const searchProjects = () => {
  return db(tableProject.project).select('name', 'uuid');
};
const getProjectByUuid = projectUuid => {
  return db(`${tableProject.project} AS p`)
    .select(
      'p.id',
      'p.name',
      'p.summary',
      'p.description',
      'p.uuid',
      's.name AS status'
    )
    .where({ 'p.uuid': projectUuid })
    .innerJoin(`${tableProject.project_status} AS s`, {
      's.id': 'p.project_status_id'
    })
    .first();
};
module.exports = {
  getCurrentUser,
  findById,
  signup,
  getProfileDevById,
  findByUsername,
  updateById,
  signupForTest,
  deleteDevsById,
  searchProjects,
  getProjectByUuid
};
