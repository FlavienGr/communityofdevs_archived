const express = require('express');

const router = express.Router();
const validator = require('../utils/validator/validateUserProject');
const requestValidationData = require('../middlewares/requestValidationData');

const { createProject } = require('../controllers/userProject');
const auth = require('../middlewares/auth');
const uploadDescriptionPdf = require('../middlewares/uploadDescriptionPdf');

router
  .route('/')
  .post(
    auth,
    uploadDescriptionPdf,
    validator.project,
    requestValidationData,
    createProject
  );

module.exports = router;
