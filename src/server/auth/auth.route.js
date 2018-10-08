const express = require('express');
const User = require('../user/user.model');
// const config = require('../../config/config');
// const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const router = express.Router(); // eslint-disable-line new-cap

// var url = require('url');
// var querystring = require('querystring');
// var bodyParser = require('body-parser');
// var expressJwt = require('express-jwt');
// var router = express.Router();


router.get('/setup', (req, res) => {
  // create a sample user
  const user = new User({
    username: 'admin',
    password: 'password',
    admin: true
  });

  // save the sample user
  user.save((err) => {
    if (err) throw err;
    res.json({ success: 'User saved successfully' });
  });
});

router.get('/users', (req, res) => {
  User.find({}, (err, docs) => {
    if (!err) {
      res.status(200).send(docs);
      res.json({ docs });
    } else { throw err; }
  });
});


// router.post('/token', (req, res) => {
//   User.findOne({
//     username: req.body.username || req.query.username
//   }, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//      res.json({ success: false, message: 'Authentication failed. User not found.' });
//   } else if (user) {
//      // check if password matches
//     if (user.password !== (req.body.password || req.query.password) ) {
//        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//     } else {
//        // if user is found and password is right
//        // create a token with only our given payload
//    // we don't want to pass in the entire user since that has the password
//       const payload = {
//         admin: user.admin
//       };
//       const token = jwt.sign(payload, config.jwtSecret, {
//         expiresIn: 1440 // expires in 24 hours
//       });
//
//        // return the information including token as JSON
//       res.json({
//         success: true,
//         message: 'Enjoy your token!',
//         token
//       });
//     }
//   }
//   });
// });


// route middleware to verify a token
// router.use((req, res, next) => {
//   // check header or url parameters or post parameters for token
//   const token = req.body.token || req.query.token || req.headers['x-access-token'];
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, config.jwtSecret, (err, decoded) => {
//       if (err) {
//         res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         return next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
//   return 'hi'
// });

router.get('/', (req, res) => {
  res.send({ admin: 'area' });
});


module.exports = router;
