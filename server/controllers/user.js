const DatabaseConnectionError = require('../errors/databaseConnectionError');
const RequestInsertErrors = require('../errors/request-insert-errors');
const RequestAuthErrors = require('../errors/request-auth-errors');
const User = require('../model/User');
const sendResponse = require('../utils/sendResponse');
const validInsertData = require('../utils/validInsertData');

// @desc   update a user
// @route  put /api/v1/user
// @access Private

exports.updateUser = async (req, res, next) => {
  const allowInsert = [
    'name',
    'immatriculation',
    'street',
    'city',
    'state',
    'zipcode',
    'country'
  ];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }

  try {
    const user = await User.updateById(req.body, req.user.id);
    sendResponse(user, 200, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

// @desc   get a user profile
// @route  get /api/v1/user/profile
// @access Private
exports.getUserProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.getProfileUserById(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    sendResponse(user, 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
// @desc   delete a user
// @route  delete /api/v1/user
// @access Private
exports.deleteUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    await User.deleteUserById(id);
    sendResponse({}, 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
