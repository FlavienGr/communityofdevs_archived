const CustomErrors = require('../errors/customErrors');

module.exports = (err, _req, res, _next) => {
  if (err instanceof CustomErrors) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeError() });
  }
  res
    .status(500)
    .send({ success: false, errors: [{ message: 'Error server' }] });
};
