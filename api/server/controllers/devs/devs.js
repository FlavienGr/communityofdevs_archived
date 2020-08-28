const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestAuthErrors = require('../../errors/request-auth-errors');
const Devs = require('../../model/Devs');

// @desc   get current devs
// @route  delete /api/v1/devs/currentuser
// @access Private

exports.getCurrentUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await Devs.getCurrentUser(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
