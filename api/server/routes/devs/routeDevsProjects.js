const express = require('express');

const router = express.Router();

const {
  getOneProject,
  takeAction
} = require('../../controllers/devs/devsProject');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/:id').get(auth, authorizeUser('developer'), getOneProject);
router
  .route('/action/:type/:projectId')
  .post(auth, authorizeUser('developer'), takeAction);

module.exports = router;
