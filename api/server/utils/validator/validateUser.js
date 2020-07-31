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
];
const configSignup = [
  check('immatriculation')
    .exists()
    .trim()
    .isLength({
      max: 15
    })
    .withMessage('Your immatriculation number sould be max 15 caracters long')
];
const configAddress = [check('street').trim()];
const configEmail = [
  check(
    'emailConfirmation',
    'emailConfirmation field must have the same value as the email field'
  ).custom((value, { req }) => value === req.body.email)
];

const userLogin = [...configConnection];
const userSignup = [...configConnection, ...configUser, ...configSignup];
const updatesUser = [...configUser, ...configAddress];
const changeEmail = [...configConnection, ...configEmail];

module.exports = {
  userLogin,
  userSignup,
  updatesUser,
  changeEmail
};
