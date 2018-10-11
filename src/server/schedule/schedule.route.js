const express = require('express');
const scheduleController = require('./schedule.controller');
const logRoutes = require('../log/log.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', scheduleController);
router.use('/logs', logRoutes);

module.exports = router;
