const express = require('express');
const Schedule = require('./schedule.model.js');

const router = express.Router(); // eslint-disable-line new-cap


router.post('/new', (req, res, next) => {
  const schedule = new Schedule(req.body);
  schedule.save((err, result) => {
    if (err) return next(err);
    res.status(201);
    return res.send(result);
  });
});

// ```console
// POST api/v1/schedule/johnny/new   (new schedule post json)
// ```
// ```console
// UPDATE api/v1/schedule/johnny/update
// ```
// ```console
// DELETE api/v1/schedule/johnny/delete
// ```
// ```console
// GET api/v1/schedule/johnny  (all schedule)
// ```

module.exports = router;
