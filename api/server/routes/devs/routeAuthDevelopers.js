const express = require('express');

const router = express.Router();
const {
  login,
  getAccessToken,
  devLogout
} = require('../../controllers/devs/authDevelopers');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/login').get(login);
router.route('/login/github/callback').get(getAccessToken);
router.route('/logout').get(auth, authorizeUser('developer'), devLogout);

module.exports = router;
