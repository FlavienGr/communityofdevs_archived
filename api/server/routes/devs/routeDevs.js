const express = require('express');

const router = express.Router();

const { getCurrentUser } = require('../../controllers/devs/devs');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router
  .route('/currentUser')
  .get(auth, authorizeUser('developer'), getCurrentUser);

module.exports = router;
