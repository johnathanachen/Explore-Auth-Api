const express = require('express');
const programController = require('./program.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', programController);

module.exports = router;
