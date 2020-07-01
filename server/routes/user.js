const express = require('express');

const router = express.Router();
const validator = require('../utils/validator/validateUser');
const requestValidationData = require('../middlewares/requestValidationData');

const {
  updateUser,
  getUserProfile,
  deleteUser
} = require('../controllers/user');
const auth = require('../middlewares/auth');

router
  .route('/')
  .put(auth, validator.updatesUser, requestValidationData, updateUser)
  .delete(auth, deleteUser);
router.route('/profile').get(auth, getUserProfile);

module.exports = router;
