const express = require('express');

const router = express.Router();

const { getCurrentUser } = require('../../controllers/devs/devs');
const auth = require('../../middlewares/auth');

router.route('/currentUser').get(auth, getCurrentUser);

module.exports = router;
