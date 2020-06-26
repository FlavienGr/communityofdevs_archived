const { validationResult } = require('express-validator');
const RequestValidationErrors = require('../errors/request-validation-errors');

const requestValidationData = async (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidationErrors(errors.array()));
  }
  next();
};

module.exports = requestValidationData;