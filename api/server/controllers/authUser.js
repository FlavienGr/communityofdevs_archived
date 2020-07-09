const RequestAuthErrors = require('../errors/request-auth-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const Helper = require('../utils/helper');
const User = require('../model/User');
const sendResponse = require('../utils/sendResponse');
const { sanitizedUser } = require('../utils/sanitizedUser');
const validInsertData = require('../utils/validInsertData');
const RequestInsertErrors = require('../errors/request-insert-errors');

// @desc   Create a user
// @route  Post user api/v1/user/auth/signup
// @access Public
exports.userSignup = async (req, res, next) => {
  const allowInsert = [
    'name',
    'email',
    'password',
    'immatriculation',
    'street',
    'city',
    'state',
    'zipcode',
    'country',
    'cgu'
  ];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }
  try {
    const userExists = await User.findByEmail(req.body.email);
    if (userExists) {
      return next(new RequestAuthErrors());
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const user = await User.signup(req.body, hashPassword);

    const token = await Helper.generateToken(user.id);

    sendResponse(sanitizedUser(user, token), 201, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
// @desc   Login a user
// @route  Post api/v1/user/auth/login
// @access Public

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmailLogin(email);
    if (!user) {
      return next(new RequestAuthErrors());
    }

    const isMatch = Helper.comparePassword(user.password, password);

    if (!isMatch) {
      return next(new RequestAuthErrors());
    }
    const token = await Helper.generateToken(user.id);

    // Delete password before sending the object
    sendResponse(sanitizedUser(user, token), 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
