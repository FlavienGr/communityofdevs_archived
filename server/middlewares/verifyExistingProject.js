const Project = require('../model/Project');
const RequestProjectErrors = require('../errors/request-project-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');

module.exports = async (req, _res, next) => {
  let project;
  try {
    project = await Project.getProjectByIds(req.user.id, req.params.id);
    if (!project) {
      return next(
        new RequestProjectErrors("You don't have corresponding project")
      );
    }
    req.user.project = project;
    return next();
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
