const express = require('express');

const router = express.Router();

const { getCurrentUser, getProfile } = require('../../controllers/devs/devs');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router
  .route('/currentUser')
  .get(auth, authorizeUser('developer'), getCurrentUser);
router.route('/profile').get(auth, authorizeUser('developer'), getProfile);

module.exports = router;
