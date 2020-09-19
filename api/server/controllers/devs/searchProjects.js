const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestAuthErrors = require('../../errors/request-auth-errors');
const Devs = require('../../model/Devs');

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
