const express = require('express');
const userRoutes = require('./server/user/user.route');
const programRoutes = require('./server/program/program.route');
const scheduleRoutes = require('./server/schedule/schedule.route');

const router = express.Router(); // eslint-disable-line new-cap


router.use('/users', userRoutes);
router.use('/programs', programRoutes);
router.use('/schedules', scheduleRoutes);

module.exports = router;
