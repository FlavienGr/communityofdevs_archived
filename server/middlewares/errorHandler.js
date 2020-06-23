const RequestValidationErrors = require('../errors/request-validation-errors');
const DatabaseConnectionError = require('../errors/databaseConnectionError');
const RequestAuthErrors = require('../errors/request-auth-errors');
const AuthMiddlewareError = require('../errors/authMiddlewareError');

module.exports = (err, _req, res, next) => {
  if (
    err instanceof RequestValidationErrors ||
    err instanceof DatabaseConnectionError ||
    err instanceof RequestAuthErrors ||
    err instanceof AuthMiddlewareError
  ) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeError() });
  }
  console.log(err.message, 'error');
  res
    .status(500)
    .send({ success: false, errors: [{ message: 'Error server' }] });
};
