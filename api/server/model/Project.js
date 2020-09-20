const { v4: uuidv4 } = require('uuid');
const db = require('../db/index');
const tableProject = require('../constants/tableProject');

const searchByName = name => {
  return db(tableProject.project)
    .select('name')
    .where({ name })
    .first();
};
const getProjectByIds = async (userId, projectId) => {
  return await db(`${tableProject.project} AS p`)
    .select(
      'p.id',
      'p.name',
      'p.summary',
      'p.description',
      'p.uuid',
      's.name AS status'
    )
    .where({ 'p.id': projectId, 'p.user_id': userId })
    .innerJoin(`${tableProject.project_status} AS s`, {
      's.id': 'p.project_status_id'
    })
    .first();
};
const getProjectById = async projectId => {
  return await db(`${tableProject.project} AS p`)
    .select(
      'p.id',
      'p.name',
      'p.summary',
      'p.description',
      'p.uuid',
      's.name AS status'
    )
    .where({ 'p.id': projectId })
    .innerJoin(`${tableProject.project_status} AS s`, {
      's.id': 'p.project_status_id'
    })
    .first();
};
const getProjectByUuid = async (userId, projectUuid) => {
  return await db(`${tableProject.project} AS p`)
    .select(
      'p.id',
      'p.name',
      'p.summary',
      'p.description',
      'p.uuid',
      's.name AS status'
    )
    .where({ 'p.uuid': projectUuid, 'p.user_id': userId })
    .innerJoin(`${tableProject.project_status} AS s`, {
      's.id': 'p.project_status_id'
    })
    .first();
};
const createProject = async (id, body, imageUrl) => {
  const projectStatus = await db(tableProject.project_status)
    .where({ name: 'Proposition' })
    .select('id')
    .first();
  const project = await db(tableProject.project).insert(
    {
      user_id: id,
      project_status_id: projectStatus.id,
      name: body.name,
      uuid: uuidv4(),
      summary: body.summary,
      description: imageUrl
    },
    ['id']
  );
  return project[0].id;
};
const deleteProject = async (userId, projectId) => {
  await db(`${tableProject.project} AS p`)
    .del()
    .where({ 'p.id': projectId, 'p.user_id': userId });

  return {};
};
const getProjects = async id => {
  return await db(`${tableProject.project} AS p`)
    .select(
      'p.id',
      'p.name',
      'p.uuid',
      'p.summary',
      'p.description',
      's.name AS status'
    )
    .where({ 'p.user_id': id })
    .innerJoin(`${tableProject.project_status} AS s`, {
      's.id': 'p.project_status_id'
    });
};
const udpateProjectByIds = async (userId, projectId, body) => {
  await db(`${tableProject.project} AS p`)
    .where({ 'p.id': projectId, 'p.user_id': userId })
    .update(body, ['id']);
  return getProjectByIds(userId, projectId);
};

module.exports = {
  searchByName,
  createProject,
  getProjectByIds,
  deleteProject,
  getProjects,
  udpateProjectByIds,
  getProjectByUuid,
  getProjectById
};
