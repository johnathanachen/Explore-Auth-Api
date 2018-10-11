const express = require('express');
const logController = require('./log.controller');
const exerciseRoutes = require('../exercise/exercise.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', logController);
router.use('/exercises', exerciseRoutes);

module.exports = router;
