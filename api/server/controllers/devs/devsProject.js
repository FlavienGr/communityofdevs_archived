const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestProjectErrors = require('../../errors/request-project-errors');
const Devs = require('../../model/Devs');

// @desc   search projects
// @route  get /api/v1/devs/search
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
