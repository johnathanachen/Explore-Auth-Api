const express = require('express');
const Exercise = require('./exercise.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  res.send('hi');
});

// router.get('/', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, config.jwtSecret);
//   const username = decoded.username;
//
//   Exercise.find({ userId: username }).exec((err, result) => {
//     if (!err) {
//       res.status(200).send(result);
//       res.json({ result });
//     } else { throw err; }
//   });
// });

router.post('/new', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;

  const newExercise = new Exercise({
    name: req.body.name,
    duration: req.body.duration,
    exercises: req.body.exercises,
    frequency: req.body.frequency,
    repetition: req.body.repetition,
    setQuantity: req.body.setQuantity,
    userId: username
  });

  newExercise.save((err) => {
    if (err) throw err;
    res.json({ success: newExercise });
  });
});

router.put('/:exercise/edit', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;
  Exercise.findOneAndUpdate({ userId: username, name: req.params.exercise },
     req.body, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, message: 'Successfully updated' });
    });
});

router.delete('/:exercise', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;

  Exercise.findOneAndRemove({ userId: username, name: req.params.exercise }, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, message: 'Successfully deleted' });
  });
});

module.exports = router;
