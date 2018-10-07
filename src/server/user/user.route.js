const express = require('express');
const User = require('./user.model.js');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  res.json({ welcome: 'user' });
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
       // if user is found and password is right
       // create a token with only our given payload
   // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin
        };
        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 1440 // expires in 24 hours
        });

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
