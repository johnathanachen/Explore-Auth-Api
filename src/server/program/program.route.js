const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/v1/schedule', (req, res) => {
  // get user token and find user's schedule
  res.send('todo');
});

router.put('/v1/:id', (req, res) => {
  // edit a program
  res.send('edit program');
});
