const express = require('express');

const router = express.Router();

const {
  getOneProject,
  takeAction,
  getOneProjectRelation,
  getProjects,
  deleteAction,
  updateAction
} = require('../../controllers/devs/devsProject');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/').get(auth, authorizeUser('developer'), getProjects);

router.route('/:id').get(auth, authorizeUser('developer'), getOneProject);

router
  .route('/relation/:id')
  .get(auth, authorizeUser('developer'), getOneProjectRelation);

router
  .route('/action/:type/:projectId')
  .post(auth, authorizeUser('developer'), takeAction)
  .put(auth, authorizeUser('developer'), updateAction);
router
  .route('/action/:projectId')
  .delete(auth, authorizeUser('developer'), deleteAction);

module.exports = router;
