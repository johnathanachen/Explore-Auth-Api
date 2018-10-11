/* eslint-disable */
const mongoose = require('mongoose');
const Program = require('../program/program.model');
const User = require('../user/user.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.config.includeStack = true;
chai.use(chaiHttp);

describe('Program', () => {
  beforeEach((done) => {

    const newProgram = new Program();
        newProgram.name = 'test program';
        newProgram.duration = 0;
        newProgram.exercises = 1;
        newProgram.frequency = 2;
        newProgram.repetition = 3;
        newProgram.setQuantity = 4;
        newProgram.save((err) => {
            if (err) {
                console.log(err);
            }
            done();
        });
  });

  afterEach((done) => {
    Program.remove({name: 'test program'}, (err) => {
          done();
        });
  });

  describe('/GET programs', () => {
    it('it should GET all programs', (done) => {
      chai.request(server)
            .get('/api/v1/users/programs')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
    });
  });
});
