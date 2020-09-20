const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestProjectErrors = require('../../errors/request-project-errors');
const Devs = require('../../model/Devs');
const Project = require('../../model/Project');

// @desc   get one project
// @route  get /api/v1/devs/project/:id
// @access Private

exports.getOneProject = async (req, res, next) => {
  let project;
  try {
    project = await Devs.getProjectByUuid(req.params.id);
    if (!project) {
      return next(
        new RequestProjectErrors("You don't have a corresponding project")
      );
    }
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
// @desc   take Action project
// @route  get /api/v1/devs/project/action/:type
// @access Private

exports.takeAction = async (req, res, next) => {
  try {
    const project = await Project.getProjectById(req.params.projectId);
    if (!project) {
      return next(new RequestProjectErrors('No corresponding project'));
    }
    const isRelationProjectExists = await Devs.getRelationProjectById(
      req.user.id,
      req.params.projectId
    );
    if (isRelationProjectExists) {
      const isTheSameAction = await Devs.getProjectActionById(
        isRelationProjectExists.project_id,
        isRelationProjectExists.devs_id
      );

      if (isTheSameAction) {
        if (isTheSameAction.name === req.params.type) {
          return next(
            new RequestProjectErrors('This action has already been choosen')
          );
        }
      }
      return next(new RequestProjectErrors('Action not Allowed'));
    }

    await Devs.takeAction(req.user.id, project.id, req.params.type);
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    console.log(error);
    return next(new DatabaseConnectionError());
  }
};
