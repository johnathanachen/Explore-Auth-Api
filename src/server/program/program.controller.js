const express = require('express');
const Program = require('./program.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;

  Program.find({ userId: username }).exec((err, result) => {
    if (!err) {
      res.status(200).send(result);
      res.json({ result });
    } else { throw err; }
  });
});

router.put('/:program', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;
  Program.findOneAndUpdate({ userId: username, name: req.params.program }, req.body, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, message: 'Successfully updated' });
    });
});


router.post('/new', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;

  const newProgram = new Program({
    name: req.body.name,
    duration: req.body.duration,
    exercises: req.body.exercises,
    frequency: req.body.frequency,
    repetition: req.body.repetition,
    setQuantity: req.body.setQuantity,
    userId: username
  });

  newProgram.save((err) => {
    if (err) throw err;
    res.json({ success: newProgram });
  });
});

router.delete('/:program', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;

  Program.findOneAndRemove({ userId: username, name: req.params.program }, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, message: 'Successfully deleted' });
  });
});

module.exports = router;
