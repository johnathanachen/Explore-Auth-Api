
const express = require('express');
const User = require('../user/user.model');
const config = require('../../config/config');
const auth = require('../../config/auth');
const jwt = require('jsonwebtoken');

const router = express.Router(); // eslint-disable-line new-cap


router.get('/setup', (req, res) => {
  // create a sample user
  const user = new User({
    username: req.body.username || req.query.username,
    password: req.body.password || req.query.password,
    admin: true
  });

  // save the sample user
  user.save((err) => {
    if (err) throw err;
    res.json({ success: 'User saved successfully' });
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username || req.query.username
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ error: 'Authentication failed. User not found.' });
    } else if (user) {
     // check if password matches
      if (user.password !== (req.body.password || req.query.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const payload = {
          admin: user.admin
        };
        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 1440 // expires in 24 hours
        });

        res.json({
          success: 'Enjoy your token!',
          token
        });
      }
    }
  });
});

router.get('/users', auth.required, (req, res) => {
  User.find({}, (err, result) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ result, success: 'Users fetched' });
  });
});

router.delete('/users/:user', auth.required, (req, res) => {
  User.findOneAndRemove({ username: req.params.user }, (err) => {
    if (err) return res.status(500).json({ err: err.message });
    return res.json({ success: 'User deleted' });
  });
});

module.exports = router;
