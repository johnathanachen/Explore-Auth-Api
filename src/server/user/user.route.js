const express = require('express');
const userController = require('./user.controller');
const programRoutes = require('../program/program.route');
const scheduleRoutes = require('../schedule/schedule.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', userController);
router.use('/programs', programRoutes);
router.use('/schedules', scheduleRoutes);

module.exports = router;
