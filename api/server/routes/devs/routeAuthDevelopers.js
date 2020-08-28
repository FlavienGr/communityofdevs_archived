const express = require('express');

const router = express.Router();

const {
  login,
  getAccessToken
} = require('../../controllers/devs/authDevelopers');

router.route('/login').get(login);
router.route('/login/github/callback').get(getAccessToken);

module.exports = router;
