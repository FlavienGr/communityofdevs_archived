const express = require('express');
const router = express.Router();

const validator = require('../../utils/validator/validateDevs');
const requestValidationData = require('../../middlewares/requestValidationData');

const {
  getCurrentUser,
  getProfile,
  updateDevs
} = require('../../controllers/devs/devs');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router
  .route('/')
  .put(
    auth,
    authorizeUser('developer'),
    validator.updatesDevs,
    requestValidationData,
    updateDevs
  );
router
  .route('/currentUser')
  .get(auth, authorizeUser('developer'), getCurrentUser);
router.route('/profile').get(auth, authorizeUser('developer'), getProfile);

module.exports = router;
