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
  const insertData = {};
  const requiredData = [
    'name',
    'email',
    'html_url',
    'location',
    'id',
    'blog',
    'login'
  ];
  for (const item of requiredData) {
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
  const updateUser = { ...data };

  for (const item in updateUser) {
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
const takeAction = async (user, project, action) => {
  const status = await db(tableProject.project_status_relation)
    .select('id')
    .where({ name: action })
    .first();
  const data = {
    project_id: project,
    project_status_relation_id: status.id,
    devs_id: user
  };
};
const updateAction = async (user, project, action) => {
  const status = await db(tableProject.project_status_relation)
    .select('id')
    .where({ name: action })
    .first();
  const data = {
    project_id: project,
    project_status_relation_id: status.id,
    devs_id: user
  };

  return await db(tableProject.project_relation).update(data, [
    'project_id',
    'devs_id'
  ]);
};
const getRelationProjectById = (userId, projectId) => {
  return db(tableProject.project_relation)
    .select('project_id', 'devs_id', 'project_status_relation_id')
    .where({ project_id: projectId, devs_id: userId })
    .first();
};
const getRelationProjectStatusById = (userId, projectId) => {
  return db(`${tableProject.project_relation} AS p`)
    .select(
      'p.project_id',
      'p.devs_id',
      'p.project_status_relation_id',
      'r.name'
    )
    .where({ project_id: projectId, devs_id: userId })
    .innerJoin(`${tableProject.project_status_relation} AS r`, {
      'r.id': 'p.project_status_relation_id'
    })
    .first();
};
const getProjectActionById = (projectId, userId) => {
  return db(`${tableProject.project_relation} AS p`)
    .select(
      'p.project_id',
      'p.devs_id',
      'p.project_status_relation_id',
      's.name'
    )
    .innerJoin(`${tableProject.project_status_relation} AS s`, {
      's.id': 'p.project_status_relation_id'
    })
    .where({ project_id: projectId, devs_id: userId })
    .first();
};
const getProjects = userId => {
  return db(`${tableProject.project_relation} AS p`)
    .select(
      'p.project_id',
      'p.devs_id',
      'p.project_status_relation_id',
      'm.name',
      'm.uuid'
    )
    .innerJoin(`${tableProject.project} AS m`, {
      'm.id': 'p.project_id'
    })
    .where({ devs_id: userId });
};
const deleteActionRelation = (userId, projectId) => {
  return db(tableProject.project_relation)
    .where({ devs_id: userId, project_id: projectId })
    .del();
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
  getProjectByUuid,
  takeAction,
  getRelationProjectById,
  getProjectActionById,
  getRelationProjectStatusById,
  getProjects,
  deleteActionRelation,
  updateAction
};
