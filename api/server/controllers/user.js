const DatabaseConnectionError = require('../errors/databaseConnectionError');
const RequestInsertErrors = require('../errors/request-insert-errors');
const RequestAuthErrors = require('../errors/request-auth-errors');
const User = require('../model/User');
const sendResponse = require('../utils/sendResponse');
const validInsertData = require('../utils/validInsertData');
const { sendQuitEmail } = require('../email/email');

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
  const removeDuplicateField = (data, user) => {
    const response = Object.keys(data).reduce((obj, key) => {
      if (data[key] !== user[key]) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = data[key];
      }
      return obj;
    }, {});
    return response;
  };
  try {
    const user = await User.getProfileUserById(req.user.id);
    const updateData = removeDuplicateField(req.body, user);
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ success: true, data: user });
    }
    if (updateData.name !== undefined) {
      const userNameExists = await User.findByName(updateData.name);
      if (userNameExists) {
        return next(
          new RequestAuthErrors(
            'This name is already taken, please choose another one'
          )
        );
      }
    }
    const userUpdated = await User.updateById(updateData, req.user.id);
    return res.status(200).json({ success: true, data: userUpdated });
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
    sendQuitEmail(user.email);
    sendResponse({}, 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};

// @desc   get current user
// @route  delete /api/v1/user/currentuser
// @access Private
exports.getCurrentUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.getCurrentUser(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
