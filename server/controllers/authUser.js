const RequestAuthErrors = require('../errors/request-auth-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const Helper = require('../utils/helper');
const User = require('../model/User');
const sendResponse = require('../utils/sendResponse');
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
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      jwt: token
    };

    sendResponse(sanitizedUser, 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
