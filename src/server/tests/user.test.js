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

// const loginDetails = {
//   username: 'TEST user',
//   password: 'password'
// }

const registerDetails = {
  username: 'TEST user',
  password: 'password',
  firstName: 'Johnny',
  admin: false
};

const user = {
  token: 'token'
};

describe('User', () => {
  beforeEach((done) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    const newUser = new User();
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


  describe('/GET users/current', () => {
    it('it should return 202 for authorized', (done) => {
      chai.request(server)
            .get('/api/v1/users/current')
            .set('Authorization', `Token ${user.token}`)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
    });
  });

  afterEach((done) => {
    User.remove({ username: 'TEST user' }, (err) => {
      if (err) throw new Error('cannot remove user');
      done();
    });
  });
});

describe('/GET users/current', () => {
  it('it should return 401 for unauthorized', (done) => {
    chai.request(server)
          .get('/api/v1/users/current')
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
  });
});
