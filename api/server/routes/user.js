const express = require('express');

const router = express.Router();
const validator = require('../utils/validator/validateUser');
const requestValidationData = require('../middlewares/requestValidationData');

const {
  updateUser,
  getUserProfile,
  deleteUser,
  getCurrentUser,
  sendContactEmail
} = require('../controllers/user');
const auth = require('../middlewares/auth');
const authorizeUser = require('../middlewares/authorizeUser');

router
  .route('/')
  .put(
    auth,
    authorizeUser('user'),
    validator.updatesUser,
    requestValidationData,
    updateUser
  )
  .delete(auth, authorizeUser('user'), deleteUser);
router.route('/profile').get(auth, authorizeUser('user'), getUserProfile);
router.route('/currentUser').get(auth, authorizeUser('user'), getCurrentUser);
router
  .route('/contact')
  .post(validator.sendEmail, requestValidationData, sendContactEmail);

module.exports = router;
