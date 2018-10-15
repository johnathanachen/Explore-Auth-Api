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

  const newExercise = {
    name: 'bench',
    setQuantity: 5,
    repetition: 5,
    weight: 200
  };

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

  // <!-- GET Logs  -->
  describe('/GET logs', () => {
    it('it should GET all logs in schedule', (done) => {
      chai.request(server)
            .get(`/api/v1/users/schedules/${newSchedule.name}/logs`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END GET Logs  -->

  // <!-- PUT Add To Log  -->
  describe('/POST schedules/new', () => {
    it('make a new Schedule', (done) => {
      chai.request(server)
            .put('/api/v1/users/schedules/logs/edit')
            .set('Authorization', `Token ${user.token}`)
            .send(newExercise)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END PUT Add To Log  -->

  // <!-- Remove exercise from Logs  -->
  describe('/PUT /:schedule/logs/:log', () => {
    it('Remove exercise from logs', (done) => {
      chai.request(server)
            .put(`/api/v1/users/schedules/${newSchedule.name}/logs/${newExercise.name}`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END Remove exercise from Logs  -->

});
// <!-- END List and New  -->
