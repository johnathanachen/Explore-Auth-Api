const express = require('express');
const Schedule = require('./schedule.model');
const Log = require('../log/log.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;
  Schedule.find({ userId }).exec((err, result) => {
    if (!err) {
      res.status(200).json({ result });
    } else { res.status(500).json({ err: err.message }); }
  });
});

router.post('/new', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;
  const userId = decoded.id;

  const newSchedule = new Schedule({
    name: req.body.name,
    programName: req.body.programName,
    userId,
    username,
    logs: []
  });

  newSchedule.save((err) => {
    if (err) throw err;
    res.json({ result: newSchedule, success: 'Schedule added' });
  });
});

router.put('/:schedule/edit', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  Schedule.findOneAndUpdate(({ userId }, { name: req.params.schedule }),
     req.body, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, success: 'Schedule updated' });
    });
});

router.delete('/:schedule', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  Schedule.findOneAndRemove({ userId, name: req.params.schedule }, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, success: 'Schedule deleted' });
  });
});

router.post('/:schedule/logs/new', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  const newLog = new Log({
    scheduleId: req.params.log,
    userId
  });

  newLog.save((err) => {
    if (err) throw err;
    res.json({ success: newLog, message: 'Schedule added' });
  });
});

module.exports = router;
