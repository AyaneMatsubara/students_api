const express = require('express');
const router = express.Router();

router.use('/user', require('./user.js'));
router.use('/univ', require('./univ.js'));

module.exports = router;
