const Project = require('../model/Project');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const sendResponse = require('../utils/sendResponse');
const deletePdfAws = require('../utils/deletePdfAws');

exports.createProject = async (req, res, next) => {
  let projectId;
  try {
    projectId = await Project.createProject(
      req.user.id,
      req.body,
      req.user.imageUrl
    );
  } catch (error) {
    await deletePdfAws(req.user.imageUrl);
    return next(new DatabaseConnectionError());
  }
  try {
    const getProject = await Project.getProjectById(projectId);
    return sendResponse(getProject, 201, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
