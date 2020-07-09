const jwt = require('jsonwebtoken');
const AuthMiddlewareError = require('../errors/authMiddlewareError');

const { SECRET_JWT } = process.env;

const auth = async (req, _res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Make sure token exists
  if (!token) {
    return next(new AuthMiddlewareError());
  }

  try {
    // Make sure token is not outdated
    const decoded = await jwt.verify(token, SECRET_JWT);
    req.user = decoded;
    next();
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return next(new AuthMiddlewareError());
    }
    return next(new AuthMiddlewareError());
  }
};
module.exports = auth;
