const express = require('express');

const router = express.Router();

// const {
//   userSignup,
//   userLogin,
//   userLogout
// } = require('../controllers/authUser');

const auth = require('../middlewares/auth');

// router.route('/login').post(userLogin);
// router.route('/logout').get(auth, userLogout);
// router.route('/signup').post(userSignup);

module.exports = router;
