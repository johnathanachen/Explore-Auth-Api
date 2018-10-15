/* eslint-disable */
const mongoose = require('mongoose');
const User = require('../user/user.model');

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

// <!-- Admin Auth -->
describe('Admin Auth', () => {

  const registerDetails = {
    username: 'Admin user',
    password: 'password',
    firstName: 'admin',
    admin: true
  };

  // <!-- after -->
  afterEach((done) => {
    User.remove({ username: registerDetails.username }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });
  // <!-- after -->

  // <!-- GET setup  -->
  describe('/GET', () => {
    it('setup new admin', (done) => {
      chai.request(server)
            .get(`/admin/setup?username=${registerDetails.username}&password=${registerDetails.password}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END GET setup  -->

});
// <!-- END Admin Auth  -->

// <!-- LOGIN and FETCH Users -->
describe('Login and Fetch users', () => {

  const registerDetails = {
    username: 'Auth user',
    password: 'password',
    firstName: 'Johnny',
    admin: true
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const program = {
    _id: 'id'
  };

  const newUser = new User();

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

  afterEach((done) => {
    User.remove({ username: newUser.username }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });
  // <!-- END before and after -->

  // <!-- POST login  -->
  describe('/POST login', () => {
    it('login admin', (done) => {
      chai.request(server)
            .post(`/admin/login?username=${newUser.username}&password=${newUser.password}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              res.body.should.have.property('token');
              done();
            });
    });
  });
  // <!-- END POST login  -->

  // <!-- GET all users  -->
  describe('/GET', () => {
    it('user list', (done) => {
      chai.request(server)
            .get(`/admin/users`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- END GET all users  -->

});
// <!-- END LOGIN and FETCH Users -->

// <!-- REMOVE users  -->
describe('Remove users', () => {

  const registerDetails = {
    username: 'Auth user',
    password: 'password',
    firstName: 'Johnny',
    admin: true
  };

  const user = {
    id: 'id',
    token: 'token'
  };

  const program = {
    _id: 'id'
  };

  const newUser = new User();

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

  afterEach((done) => {
    User.find({ username: newUser.username }, (err, result) => {
      if (!result.lenght) return done();
      throw new Error('faile to remove user');
    });
  });
  // <!-- END before and after -->

  // <!-- REMOVE user  -->
  describe('/DELETE', () => {
    it('user from db', (done) => {
      chai.request(server)
            .delete(`/admin/users/${newUser.username}`)
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success');
              done();
            });
    });
  });
  // <!-- REMOVE user  -->

});
// <!-- END REMOVE users -->
