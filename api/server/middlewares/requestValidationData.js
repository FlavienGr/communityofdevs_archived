const { validationResult } = require('express-validator');
const RequestValidationErrors = require('../errors/request-validation-errors');
const deleteTempFile = require('../utils/deleteTempFile');

const requestValidationData = async (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.file) {
      deleteTempFile(req.file.path);
    }
    return next(new RequestValidationErrors(errors.array()));
  }
  next();
};

module.exports = requestValidationData;
