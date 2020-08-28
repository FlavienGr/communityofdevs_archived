const express = require('express');

const router = express.Router();
const validator = require('../utils/validator/validateUserProject');
const requestValidationData = require('../middlewares/requestValidationData');
const validInsertUpdateBody = require('../middlewares/validInsertUpdateBody');

const {
  createProject,
  deleteProject,
  getProjects,
  getOneProject,
  udpateProject,
  udpatePdfProject
} = require('../controllers/userProject');

// middlewares
const auth = require('../middlewares/auth');
const uploadDescriptionPdf = require('../middlewares/uploadDescriptionPdf');
const { uploadPdfAws } = require('../middlewares/uploadPdfAws');
const requestProjectName = require('../middlewares/requestProjectName');
const verifyExistingProject = require('../middlewares/verifyExistingProject');
const authorizeUser = require('../middlewares/authorizeUser');

router
  .route('/')
  .post(
    auth,
    authorizeUser('user'),
    uploadDescriptionPdf,
    validator.project,
    requestValidationData,
    requestProjectName,
    uploadPdfAws,
    createProject
  )
  .get(auth, authorizeUser('user'), getProjects);
router
  .route('/:id')
  .delete(auth, authorizeUser('user'), deleteProject)
  .get(auth, authorizeUser('user'), getOneProject)
  .put(
    auth,
    authorizeUser('user'),
    validator.udpate,
    requestValidationData,
    validInsertUpdateBody,
    requestProjectName,
    verifyExistingProject,
    udpateProject
  );
router
  .route('/upload/:id')
  .put(
    auth,
    authorizeUser('user'),
    uploadDescriptionPdf,
    verifyExistingProject,
    uploadPdfAws,
    udpatePdfProject
  );
module.exports = router;
