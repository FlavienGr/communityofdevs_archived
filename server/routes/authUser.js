const express = require('express');

const router = express.Router();
const validationData = require('../middlewares/validationData');

const {
  //   userSignup,
  userLogin
  //   userLogout
} = require('../controllers/authUser');

const auth = require('../middlewares/auth');

router.route('/login').post(validationData, userLogin);
// router.route('/logout').get(auth, userLogout);
// router.route('/signup').post(userSignup);

module.exports = router;
