/* eslint-disable */
const mongoose = require('mongoose');
const Exercise = require('../exercise/exercise.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.config.includeStack = true;
chai.use(chaiHttp);

// describe('/GET exercises', () => {
//   it('it should GET all exercises', (done) => {
//     chai.request(server)
//           .get('/api/v1/users/schedules/logs/exercises')
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
//   });
// });
