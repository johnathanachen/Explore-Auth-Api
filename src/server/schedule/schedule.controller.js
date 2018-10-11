const express = require('express');
const Schedule = require('./schedule.model');
const Log = require('../log/log.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

// router.get('/', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, config.jwtSecret);
//   const userId = decoded.id;
//   Schedule.find({ userId }).exec((err, results) => {
//     if (!err) {
//       res.status(200).send(results);
//       res.json({ result: results, message: 'Successfully fetched' });
//     } else { res.json({ result: 'no schedules' }); }
//   });
// });

router.get('/', (req, res) => {
  res.send('hi');
});

router.post('/new', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;
  const userId = decoded.id;

  const newSchedule = new Schedule({
    programId: req.body.programId,
    programName: req.body.programName,
    userId,
    username,
    logs: []
  });

  newSchedule.save((err) => {
    if (err) throw err;
    res.json({ result: newSchedule, message: 'Successfully added' });
  });
});

router.put('/:schedule/edit', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;
  Schedule.findOneAndUpdate({ userId, programName: req.params.schedule },
     req.body, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, message: 'Successfully updated' });
    });
});

router.delete('/:schedule', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  Schedule.findOneAndRemove({ userId, programName: req.params.schedule }, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, message: 'Successfully deleted' });
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
    res.json({ success: newLog, message: 'Successfully added' });
  });
});

module.exports = router;
