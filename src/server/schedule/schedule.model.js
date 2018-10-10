const mongoose = require('mongoose');
const Log = require('../log/log.model');
const Program = require('../program/program.model');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  program: { type: mongoose.Schema.Types.ObjectId, ref: Program },
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: Log }],
}, {
  versionKey: false
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule');
