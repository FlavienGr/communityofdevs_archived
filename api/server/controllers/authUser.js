const crypto = require('crypto');
const RequestAuthErrors = require('../errors/request-auth-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const Helper = require('../utils/helper');
const User = require('../model/User');
const sendResponse = require('../utils/sendResponse');
const { sanitizedUser } = require('../utils/sanitizedUser');
const validInsertData = require('../utils/validInsertData');
const RequestInsertErrors = require('../errors/request-insert-errors');
const {
  sendWelcomeEmail,
  sendAfterChangeEmail,
  sendResetPassword
} = require('../email/email');

// @desc   Create a user
// @route  Post user api/v1/user/auth/signup
// @access Public
exports.userSignup = async (req, res, next) => {
  const allowInsert = ['name', 'email', 'password', 'immatriculation', 'cgu'];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }
  try {
    const userEmailExists = await User.findByEmail(req.body.email);
    const userNameExists = await User.findByName(req.body.name);
    if (userEmailExists) {
      return next(
        new RequestAuthErrors(
          'Authentication failed, try with another email address'
        )
      );
    }
    if (userNameExists) {
      return next(
        new RequestAuthErrors(
          'This name is already taken, please choose another one'
        )
      );
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const user = await User.signup(req.body, hashPassword);

    const token = await Helper.generateToken(user.id, 'user');
    sendWelcomeEmail(user.email);
    sendResponse(sanitizedUser(user), token, 201, res);
  } catch (error) {
    return next(new DatabaseConnectionError());
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
    const token = await Helper.generateToken(user.id, 'user');

    // Delete password before sending the object
    sendResponse(sanitizedUser(user), token, 200, res);
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};
// @desc   Change email user
// @route  Post api/v1/user/auth/change-email
// @access Private

exports.changeEmail = async (req, res, next) => {
  const allowInsert = ['email', 'emailConfirmation', 'password'];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }
  const { id } = req.user;
  try {
    const userEmailExists = await User.findByEmail(req.body.email);
    if (userEmailExists) {
      return next(
        new RequestAuthErrors(
          'Operation failed, try with another email address'
        )
      );
    }
    const user = await User.findByIdPassword(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }

    const isMatch = Helper.comparePassword(user.password, req.body.password);

    if (!isMatch) {
      return next(new RequestAuthErrors());
    }
    await User.updateEmail(req.body.email, id);
    sendAfterChangeEmail(req.body.email);
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

// @desc   Change password
// @route  Post api/v1/user/auth/change-password
// @access Private

exports.changePassword = async (req, res, next) => {
  const allowInsert = ['oldPassword', 'password', 'passwordConfirmation'];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }
  const { id } = req.user;
  const { oldPassword } = req.body;
  try {
    const user = await User.findByIdPassword(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }

    const isMatch = Helper.comparePassword(user.password, oldPassword);

    if (!isMatch) {
      return next(new RequestAuthErrors());
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    await User.updatePassword(hashPassword, id);
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

// @desc   Logout a user
// @route  Post api/v1/user/auth/logout
// @access Private

exports.userLogout = async (_req, res, _next) => {
  res.clearCookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};

// @desc   change a forgot user password
// @route  Post api/v1/user/auth/forgot-password
// @access public

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');
    const resetToken = token;
    const resetTokenExpire = Date.now() + 3600000; // expires in an hour
    await User.sendTokenDB(resetToken, resetTokenExpire, user.id);

    // create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/reset-password/${resetToken}`;
    // // sendEmail
    sendResetPassword(email, resetUrl);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};

// @desc   reset a forgot user password
// @route  Patch api/v1/user/auth/reset-password/:token
// @access public

exports.resetPassword = async (req, res, next) => {
  const resetToken = req.params.token;
  const { password } = req.body;

  try {
    const user = await User.verifyResetPassword(resetToken);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    if (user.resetTokenExpire <= Date.now()) {
      return next(
        new RequestAuthErrors('Time to change your password has expired')
      );
    }
    const hashPassword = Helper.hashPassword(password);
    await User.updatePasswordAfterReset(hashPassword, user.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
