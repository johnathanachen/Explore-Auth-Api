const express = require('express');
const Log = require('./log.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  res.send('hi');
});

// router.get('/', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, config.jwtSecret);
//   const username = decoded.username;
//
//   Log.find({ userId: username }).exec((err, result) => {
//     if (!err) {
//       res.status(200).send(result);
//       res.json({ result });
//     } else { throw err; }
//   });
// });

router.put('/:log/edit', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const userId = decoded.id;
  Log.findOneAndUpdate({ userId, _id: new ObjectId('5bbedb24c1f31b82c3d7f5b6') },
     req.body, { new: true })
    .exec((err, result) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.json({ result, message: 'Successfully updated' });
    });
});

router.delete('/:log', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const username = decoded.username;


  Log.findOneAndRemove({ userId: username, name: req.params.log }, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, message: 'Successfully deleted' });
  });
});

module.exports = router;
