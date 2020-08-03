const express = require('express');

const router = express.Router();
const validator = require('../utils/validator/validateUser');
const requestValidationData = require('../middlewares/requestValidationData');

const {
  userSignup,
  userLogin,
  changeEmail,
  changePassword,
  userLogout,
  forgotpassword,
  resetPassword
} = require('../controllers/authUser');

const auth = require('../middlewares/auth');

router
  .route('/login')
  .post(validator.userLogin, requestValidationData, userLogin);

router.route('/logout').get(auth, userLogout);
router
  .route('/signup')
  .post(validator.userSignup, requestValidationData, userSignup);

router
  .route('/change-email')
  .post(auth, validator.changeEmail, requestValidationData, changeEmail);

router
  .route('/change-password')
  .post(auth, validator.changePassword, requestValidationData, changePassword);
router
  .route('/forgot-password')
  .post(validator.forgotpassword, requestValidationData, forgotpassword);
router
  .route('/reset-password/:token')
  .put(validator.resetPassword, requestValidationData, resetPassword);
module.exports = router;
