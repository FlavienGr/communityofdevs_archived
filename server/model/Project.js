const db = require('../db/index');
const tableProject = require('../constants/tableProject');

const searchByName = name => {
  return db(tableProject.project)
    .select('name')
    .where({ name })
    .first();
};
const getProjectById = async id => {
  return await db(`${tableProject.project} AS p`)
    .select('p.id', 'p.name', 'p.summary', 'p.description', 's.name AS status')
    .where({ 'p.id': id })
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
      summary: body.summary,
      description: imageUrl
    },
    ['id']
  );
  return project[0].id;
};

module.exports = {
  searchByName,
  createProject,
  getProjectById
};
