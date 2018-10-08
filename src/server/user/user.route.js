const express = require('express');
const User = require('./user.model.js');
const auth = require('../../config/auth');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', auth.optional, (req, res) => {
  res.json({ welcome: 'user' });
});

router.get('/current', auth.required, (req, res) => {
  res.json('access granted');
});

router.post('/token', (req, res) => {
  User.findOne({
    username: req.body.username || req.query.username
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
     // check if password matches
      if (user.password !== (req.body.password || req.query.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const token = user.generateJWT();
       // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your API token!',
          token
        });
      }
    }
  });
});


module.exports = router;
