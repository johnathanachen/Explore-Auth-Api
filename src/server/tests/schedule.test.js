/* eslint-disable */
const mongoose = require('mongoose');
const Schedule = require('../schedule/schedule.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.config.includeStack = true;
chai.use(chaiHttp);

describe('/GET schedules', () => {
  it('it should GET all schedules', (done) => {
    chai.request(server)
          .get('/api/v1/users/schedules')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
  });
});
