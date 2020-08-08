const express = require('express');

const router = express.Router();
router.use('/api', require('./greet.route'));

module.exports = router;
