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
// @desc   get one project relation status
// @route  get /api/v1/devs/project/relation:id
// @access Private

exports.getOneProjectRelation = async (req, res, next) => {
  let projectRelation;
  try {
    projectRelation = await Devs.getRelationProjectStatusById(
      req.user.id,
      req.params.id
    );
    if (!projectRelation) {
      return next(
        new RequestProjectErrors(
          "You don't have a corresponding relation in this project"
        )
      );
    }
    return res.status(200).json({ success: true, data: projectRelation });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
// @desc   take Action project
// @route  post /api/v1/devs/project/action/:type/:projectId
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
    console.log('take action');
    console.log(req.user.id, project.id, req.params.type);
    await Devs.takeAction(req.user.id, project.id, req.params.type);
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    console.log(error);
    return next(new DatabaseConnectionError());
  }
};

// @desc   GET projectS
// @route  get /api/v1/devs/project
// @access Private

exports.getProjects = async (req, res, next) => {
  let getProjects;
  try {
    getProjects = await Devs.getProjects(req.user.id);
    if (!getProjects) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json({ success: true, data: getProjects });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
// @desc   delete action project
// @route  get /api/v1/devs/project/action/:projectId
// @access Private

exports.deleteAction = async (req, res, next) => {
  try {
    const isRelationProjectExists = await Devs.getRelationProjectById(
      req.user.id,
      req.params.projectId
    );
    if (!isRelationProjectExists) {
      return next(new RequestProjectErrors('Action not Allowed'));
    }
    await Devs.deleteActionRelation(req.user.id, req.params.projectId);
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

// @desc   update Action project
// @route  put /api/v1/devs/project/action/:type/:projectId
// @access Private

exports.updateAction = async (req, res, next) => {
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
    } else {
      return next(new RequestProjectErrors('Action not Allowed'));
    }

    await Devs.updateAction(req.user.id, project.id, req.params.type);
    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
// @desc   get all devs
// @route  get /api/v1/devs/project/developers/:action/:projectId
// @access Private

exports.gellAllDevs = async (req, res, next) => {
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

    const devs = await Devs.getAllDevs(project.id);

    return res.status(200).json({ success: true, data: devs });
  } catch (error) {
    console.log(error);
    return next(new DatabaseConnectionError());
  }
};
