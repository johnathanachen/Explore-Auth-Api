const express = require('express');
const Schedule = require('./schedule.model');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/new', (req, res, next) => {
  const schedule = new Schedule(req.body);
  schedule.save((err, result) => {
    if (err) return next(err);
    res.status(201);
    return res.send(result);
  });
});

// router.get('/', (req, res) => {
//   return res.send('schedules route');
// });

// router.put('/:id', (req, res) => {
//   return res.send('ok');
// });
//
// router.delete('/:id', (req, res) => {
//   return res.send('ok');
// });

module.exports = router;
