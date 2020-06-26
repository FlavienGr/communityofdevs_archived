const { check } = require('express-validator');

const configConnection = [
  check('email')
    .isEmail()
    .withMessage('Incorrect email format')
    .normalizeEmail()
    .trim(),
  check('password')
    .exists()
    .withMessage('You should add a password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long')
];
const configUser = [
  check('name')
    .exists()
    .isLength({ min: 4 })
    .withMessage('name must be at least 4 chars long')
    .bail()
];
const userLogin = [...configConnection];
const userSignup = [...configConnection, ...configUser];
module.exports = {
  userLogin,
  userSignup
};
