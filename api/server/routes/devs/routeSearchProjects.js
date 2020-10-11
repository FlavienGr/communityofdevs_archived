const express = require('express');

const router = express.Router();

const {
  searchProjects,
  searchDevsById
} = require('../../controllers/devs/searchProjects');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/').get(auth, authorizeUser('developer'), searchProjects);
router
  .route('/:projectId/:id')
  .get(auth, authorizeUser('developer'), searchDevsById);

module.exports = router;
