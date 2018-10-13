/* eslint-disable */
const mongoose = require('mongoose');
const Log = require('../log/log.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.config.includeStack = true;
chai.use(chaiHttp);

// describe('/GET logs', () => {
//   it('it should GET all logs', (done) => {
//     chai.request(server)
//           .get('/api/v1/users/schedules/logs')
//           .end((err, res) => {
//             res.should.have.status(200);
//             done();
//           });
//   });
// });
