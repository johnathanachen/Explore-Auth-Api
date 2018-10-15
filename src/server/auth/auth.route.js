const express = require('express');
const adminController = require('./auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', adminController);

module.exports = router;
