const express = require('express');
const router = express.Router();

const { getOneProject } = require('../../controllers/devs/devsProject');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/:id').get(auth, authorizeUser('developer'), getOneProject);

module.exports = router;
