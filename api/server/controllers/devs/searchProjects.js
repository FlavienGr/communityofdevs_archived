const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestProjectErrors = require('../../errors/request-project-errors');
const Devs = require('../../model/Devs');
const Project = require('../../model/Project');

// @desc   search projects
// @route  get /api/v1/devs/search
// @access Private

exports.searchProjects = async (req, res, next) => {
  try {
    const projects = await Devs.searchProjects();
    if (!projects) {
      return res.status(200).json({ success: true, data: [] });
    }

    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
// @desc   search devs by id
// @route  get /api/v1/devs/search/:projectId/:id
// @access Private

exports.searchDevsById = async (req, res, next) => {
  console.log('devs search');
  console.log(req.params);
  try {
    const project = await Project.getProjectById(req.params.projectId);
    if (!project) {
      return next(new RequestProjectErrors('No corresponding project'));
    }
    const isRelationProjectExists = await Devs.getRelationProjectById(
      req.user.id,
      req.params.projectId
    );
    if (!isRelationProjectExists) {
      return next(new RequestProjectErrors('Action not Allowed'));
    }
    const dev = await Devs.getOneDev(req.params.id);
    return res.status(200).json({ success: true, data: dev });
  } catch (error) {
    console.log(error);
    next(new DatabaseConnectionError());
  }
};
