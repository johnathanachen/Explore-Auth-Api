/* eslint-disable */
const mongoose = require('mongoose');
const Program = require('../program/program.model');
const Schedule = require('../schedule/schedule.model');
const User = require('../user/user.model');
const ObjectId = require('mongodb').ObjectID;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.config.includeStack = true;
chai.use(chaiHttp);

// <!-- List and New  -->
describe('Schedule list and new ', () => {

  const registerDetails = {
    username: 'TEST user',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const program = {
    _id: 'id'
  };

  const newUser = new User();
  const newSchedule = new Schedule();
  const newProgram = new Program();

  // <!-- before and after -->
  beforeEach((done) => {

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    newUser.username = registerDetails.username;
    newUser.password = registerDetails.password;
    newUser.first = registerDetails.firstName;
    newUser.admin = registerDetails.admin;
    newUser.save((err) => {
      if (err) {
        throw new Error('unable to save user for schedule');
      } else if (!err) {
        user.token = jwt.sign({
          username: newUser.username,
          id: newUser._id,
          admin: newUser.admin,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, config.jwtSecret);
        done();
      }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;
      newProgram.name = 'TEST 5x5';
      newProgram.duration = '12 weeks';
      newProgram.exercises = ['squat', 'bench', 'deadlifts', 'overhead press', 'row'];
      newProgram.frequency = 'ever other day';
      newProgram.repetition = 5;
      newProgram.setQuantity = 5;
      newProgram.userId = userId;
      newProgram.save((err) => {
        if (err) {
          throw new Error('unable to save program');
        } else if (!err) {
          done();
        }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;

      newSchedule.name = 'Building Strength';
      newSchedule.programName = newProgram.name;
      newSchedule.userId = user.userId;
      newSchedule.username = user.username;
      newSchedule.save((err) => {
        console.log(newProgram._id)
        if (err) {
          throw new Error('unable to save schedule');
        } else if (!err) {
          done();
        }
    });
  });

  afterEach((done) => {
    User.remove({ username: newUser.username }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Schedule.remove({ schedulemName: newSchedule.name }, (err) => {
      if (err) throw new Error('cannot remove schedule');
      done();
    });
  });

  afterEach((done) => {
    Program.remove({ name: newProgram.name }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

  // <!-- GET Schedule  -->
  describe('/GET schedules', () => {
    it('it should GET all schedules', (done) => {
      chai.request(server)
            .get('/api/v1/users/schedules')
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('result');
              done();
            });
    });
  });
  // <!-- END GET Schedule  -->

  // <!-- POST New  -->
  describe('/POST schedules/new', () => {
    it('make a new Schedule', (done) => {
      chai.request(server)
            .post('/api/v1/schedules/new')
            .set('Authorization', `Token ${user.token}`)
            .send(newSchedule)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END POST New  -->

});
// <!-- END List and New  -->

// <!-- PUT Schedule  -->
describe('Schedule edit', () => {

  const registerDetails = {
    username: 'TEST user',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const program = {
    _id: 'id'
  };

  const newUser = new User();
  const newSchedule = new Schedule();
  const newProgram = new Program();

  // <!-- ROOT before and after -->
  beforeEach((done) => {

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    newUser.username = registerDetails.username;
    newUser.password = registerDetails.password;
    newUser.first = registerDetails.firstName;
    newUser.admin = registerDetails.admin;
    newUser.save((err) => {
      if (err) {
        throw new Error('unable to save user for schedule');
      } else if (!err) {
        user.token = jwt.sign({
          username: newUser.username,
          id: newUser._id,
          admin: newUser.admin,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, config.jwtSecret);
        done();
      }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;
      newProgram.name = 'TEST 5x5';
      newProgram.duration = '12 weeks';
      newProgram.exercises = ['squat', 'bench', 'deadlifts', 'overhead press', 'row'];
      newProgram.frequency = 'ever other day';
      newProgram.repetition = 5;
      newProgram.setQuantity = 5;
      newProgram.userId = userId;
      newProgram.save((err) => {
        if (err) {
          throw new Error('unable to save program');
        } else if (!err) {
          done();
        }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;

      newSchedule.name = 'Building Strength';
      newSchedule.programName = newProgram.name;
      newSchedule.userId = userId;
      newSchedule.username = user.username;
      newSchedule.save((err) => {
        if (err) {
          throw new Error('unable to save schedule');
        } else if (!err) {
          done();
        }
    });
  });

  afterEach((done) => {
    User.remove({ username: newUser.username }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Schedule.remove({ name: newSchedule.name }, (err) => {
      if (err) throw new Error('cannot remove schedule');
      done();
    });
  });

  afterEach((done) => {
    Program.remove({ name: newProgram.name }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

  // <!-- PUT edit Schedule Info -->
  describe('/PUT /:schedules/edit', () => {
    it('edit a Schedule', (done) => {
      chai.request(server)
            .put(`/api/v1/users/schedules/${newSchedule.name}/edit`)
            .set('Authorization', `Token ${user.token}`)
            .send({'programName': 'Mass Challenge'})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END edit Schedule Info  -->


});
// <!-- END edit -->


// <!-- DELETE remove Schedule  -->
describe('Remove Schedule', () => {

  const registerDetails = {
    username: 'TEST user',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const program = {
    _id: 'id'
  };

  const newUser = new User();
  const newSchedule = new Schedule();
  const newProgram = new Program();

  // <!-- ROOT before and after -->
  beforeEach((done) => {

    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    newUser.username = registerDetails.username;
    newUser.password = registerDetails.password;
    newUser.first = registerDetails.firstName;
    newUser.admin = registerDetails.admin;
    newUser.save((err) => {
      if (err) {
        throw new Error('unable to save user for schedule');
      } else if (!err) {
        user.token = jwt.sign({
          username: newUser.username,
          id: newUser._id,
          admin: newUser.admin,
          exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, config.jwtSecret);
        done();
      }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;
      newProgram.name = 'TEST 5x5';
      newProgram.duration = '12 weeks';
      newProgram.exercises = ['squat', 'bench', 'deadlifts', 'overhead press', 'row'];
      newProgram.frequency = 'ever other day';
      newProgram.repetition = 5;
      newProgram.setQuantity = 5;
      newProgram.userId = userId;
      newProgram.save((err) => {
        if (err) {
          throw new Error('unable to save program');
        } else if (!err) {
          done();
        }
    });
  });

  beforeEach((done) => {
    const decoded = jwt.verify(user.token, config.jwtSecret);
    const userId = decoded.id;

      newSchedule.name = 'Building Strength';
      newSchedule.programName = newProgram.name;
      newSchedule.userId = userId;
      newSchedule.username = user.username;
      newSchedule.save((err) => {
        if (err) {
          throw new Error('unable to save schedule');
        } else if (!err) {
          done();
        }
    });
  });

  afterEach((done) => {
    User.remove({ username: newUser.username }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Schedule.find({ name: newSchedule.name }, (err, result) => {
      if (!result.lenght) return done();
      throw new Error('schedule still in database');
    });
  });

  afterEach((done) => {
    Program.remove({ name: newProgram.name }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

  // <!-- DELETE Schedule  -->
  describe('/DELETE /:schedules', () => {
    it('Remove a Schedule', (done) => {
      chai.request(server)
            .delete(`/api/v1/users/schedules/${newSchedule.name}`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END Remove Schedule  -->

});
// <!-- END DELETE Schedule -->
