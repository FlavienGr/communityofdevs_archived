const NotAllowedToAccess = require('../errors/notAllowedToAccess');

const authorizeUser = user => (req, res, next) => {
  if (req.user.status === user) {
    return next();
  } else {
    return next(new NotAllowedToAccess());
  }
};
module.exports = authorizeUser;
