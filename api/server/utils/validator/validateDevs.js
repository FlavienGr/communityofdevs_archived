const { check } = require('express-validator');

const updatesDevs = [
  check('name')
    .if(check('name').exists())
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 chars long'),
  check('username')
    .if(check('username').exists())
    .isLength({ min: 3 })
    .withMessage('username must be at least 3 chars long')
];
const devSignup = [
  check('email')
    .isEmail()
    .withMessage('Incorrect email format')
    .normalizeEmail()
    .trim(),
  ...updatesDevs
];
module.exports = {
  updatesDevs,
  devSignup
};
