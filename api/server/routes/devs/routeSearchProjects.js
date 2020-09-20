const express = require('express');

const router = express.Router();

const { searchProjects } = require('../../controllers/devs/searchProjects');
const auth = require('../../middlewares/auth');
const authorizeUser = require('../../middlewares/authorizeUser');

router.route('/').get(auth, authorizeUser('developer'), searchProjects);

module.exports = router;
