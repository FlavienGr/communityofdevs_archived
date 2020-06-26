const { check } = require('express-validator');

const configUser = [
  check('email')
    .isEmail()
    .withMessage('Incorrect email format')
    .normalizeEmail()
    .trim(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long')
];
const userLogin = [...configUser];

module.exports = {
  userLogin
};
