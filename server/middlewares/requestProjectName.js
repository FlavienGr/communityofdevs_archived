const Project = require('../model/Project');
const RequestProjectErrors = require('../errors/request-project-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');

module.exports = async (req, _res, next) => {
  try {
    const project = await Project.searchByName(req.body.name);
    if (project) {
      return next(new RequestProjectErrors());
    }
    next();
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
