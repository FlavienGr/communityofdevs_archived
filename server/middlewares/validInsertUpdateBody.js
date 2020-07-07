const validInsertData = require('../utils/validInsertData');
const RequestInsertErrors = require('../errors/request-insert-errors');

module.exports = (req, res, next) => {
  const allowInsert = ['name', 'summary'];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }
  next();
};
