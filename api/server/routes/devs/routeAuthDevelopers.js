const express = require('express');

const router = express.Router();
const {
  login,
  getAccessToken,
  devLogout,
  devSignup
} = require('../../controllers/devs/authDevelopers');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

const validator = require('../../utils/validator/validateDevs');
const requestValidationData = require('../../middlewares/requestValidationData');

router.route('/login').get(login);
router.route('/login/github/callback').get(getAccessToken);
router.route('/logout').get(auth, authorizeUser('developer'), devLogout);
router
  .route('/signup')
  .post(validator.devSignup, requestValidationData, devSignup);
module.exports = router;
