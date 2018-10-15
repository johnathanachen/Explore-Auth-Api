const express = require('express');
const scheduleController = require('./schedule.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', scheduleController);

module.exports = router;
