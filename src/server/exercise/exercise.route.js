const express = require('express');
const exerciseController = require('./exercise.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', exerciseController);

module.exports = router;
