const RequestValidationErrors = require('../errors/request-validation-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const RequestAuthErrors = require('../errors/request-auth-errors');
const AuthMiddlewareError = require('../errors/authMiddlewareError');
const CustomErrors = require('../errors/customErrors');

module.exports = (err, _req, res, _next) => {
  if (
    err instanceof RequestValidationErrors ||
    err instanceof DatabaseConnectionError ||
    err instanceof RequestAuthErrors ||
    err instanceof AuthMiddlewareError ||
    err instanceof CustomErrors
  ) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeError() });
  }
  res
    .status(500)
    .send({ success: false, errors: [{ message: 'Error server' }] });
};
