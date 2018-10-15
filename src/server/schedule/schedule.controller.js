const express = require('express');
const Schedule = require('./schedule.model');
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

// GET LOGS lIST
router.get('/:schedule/logs', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  Schedule.find(({ userId }, { name: req.params.schedule }))
    .distinct('logs')
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, success: 'Logs found' });
    });
});

// GET EDIT LOGS
router.put('/:schedule/logs/edit', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  const newExercise = {
    name: req.body.name,
    setQuantity: req.body.setQuantity,
    repetition: req.body.repetition,
    weight: req.body.weight
  };

  Schedule.findOneAndUpdate(({ userId }, { name: req.params.schedule }),
    { $addToSet: { logs: newExercise } }, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, success: 'Log updated' });
    });
});

// REMOVE EXERCISE FROM LOGS
router.put('/:schedule/logs/:log', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;

  Schedule.update(({ userId }, { name: req.params.schedule }),
    { $pull: { logs: { name: req.params.log } } }, { new: true })
    .exec((err) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ success: `${req.params.log} removed from ${req.params.schedule}` });
    });
});


module.exports = router;
