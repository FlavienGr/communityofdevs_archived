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

router
  .route('/')
  .post(
    auth,
    uploadDescriptionPdf,
    validator.project,
    requestValidationData,
    requestProjectName,
    uploadPdfAws,
    createProject
  )
  .get(auth, getProjects);
router
  .route('/:id')
  .delete(auth, deleteProject)
  .get(auth, getOneProject)
  .put(
    auth,
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
    uploadDescriptionPdf,
    verifyExistingProject,
    uploadPdfAws,
    udpatePdfProject
  );
module.exports = router;
