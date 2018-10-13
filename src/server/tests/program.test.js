/* eslint-disable */
const mongoose = require('mongoose');
const Program = require('../program/program.model');
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

describe('Program list and new ', () => {

  const registerDetails = {
    username: 'TEST program',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const newUser = new User();
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
        throw new Error('unable to save user');
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

  afterEach((done) => {
    User.remove({ username: 'TEST program' }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Program.remove({ name: 'TEST 5x5' }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

  // <!-- GET List  -->
  describe('/GET all programs', () => {
    it('it should GET user and public programs', (done) => {
      chai.request(server)
            .get('/api/v1/users/programs')
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('result');
              done();
            });
    });
  });
  // <!-- END GET List  -->

  // <!-- POST New  -->
  describe('/POST programs/new', () => {
    it('make a new program', (done) => {
      chai.request(server)
            .post('/api/v1/programs/new')
            .set('Authorization', `Token ${user.token}`)
            .send(newProgram)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END POST New  -->

});

describe('Program edit', () => {

  const registerDetails = {
    username: 'TEST program',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const newUser = new User();
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
        throw new Error('unable to save user');
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

  afterEach((done) => {
    User.remove({ username: 'TEST program' }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Program.remove({ name: 'TEST 1x1' }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

// <!-- PUT edit program  -->
  describe('/PUT /:programs/edit', () => {
    it('edit a program', (done) => {
      chai.request(server)
            .put(`/api/v1/users/programs/${newProgram.name}/edit`)
            .set('Authorization', `Token ${user.token}`)
            .send({'name': 'TEST 1x1'})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
});
// <!-- END edit -->

// <!-- DELETE remove program  -->
describe('Program edit', () => {

  const registerDetails = {
    username: 'TEST program',
    password: 'password',
    firstName: 'Johnny',
    admin: false
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const newUser = new User();
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
        throw new Error('unable to save user');
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

  afterEach((done) => {
    User.remove({ username: 'TEST program' }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });

  afterEach((done) => {
    Program.remove({ name: 'TEST 5x5' }, (err) => {
      if (err) throw new Error('cannot remove program');
      done();
    });
  });
  // <!-- END before and after -->

// <!-- DELETE program  -->
  describe('/DELETE /:programs', () => {
    it('edit a program', (done) => {
      chai.request(server)
            .delete(`/api/v1/users/programs/${newProgram.name}`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
});
// <!-- END DELETE  -->
