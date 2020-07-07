const Project = require('../model/Project');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const sendResponse = require('../utils/sendResponse');
const deletePdfAws = require('../utils/deletePdfAws');
const RequestProjectErrors = require('../errors/request-project-errors');

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
    const getProject = await Project.getProjectByIds(req.user.id, projectId);
    return sendResponse(getProject, 201, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
exports.deleteProject = async (req, res, next) => {
  let getProject;
  try {
    getProject = await Project.getProjectByIds(req.user.id, req.params.id);
    if (!getProject) {
      return next(
        new RequestProjectErrors("You don't have corresponding project")
      );
    }
    const deletedProject = await Project.deleteProject(
      req.user.id,
      req.params.id
    );
    await deletePdfAws(getProject.description);
    return sendResponse(deletedProject, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
exports.getProjects = async (req, res, next) => {
  let getProjects;
  try {
    getProjects = await Project.getProjects(req.user.id);
    if (!getProjects) {
      return sendResponse({}, 200, res);
    }
    return sendResponse(getProjects, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
exports.getOneProject = async (req, res, next) => {
  let project;
  try {
    project = await Project.getProjectByIds(req.user.id, req.params.id);
    if (!project) {
      return next(
        new RequestProjectErrors("You don't have corresponding project")
      );
    }

    return sendResponse(project, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

exports.udpateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.udpateProjectByIds(
      req.user.id,
      req.params.id,
      req.body
    );
    return sendResponse(updatedProject, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
exports.udpatePdfProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.udpateProjectByIds(
      req.user.id,
      req.params.id,
      {
        description: req.user.imageUrl
      }
    );
    await deletePdfAws(req.user.project.description);

    return sendResponse(updatedProject, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
