const mongoose = require('mongoose');
// const Program = require('../program/program.model');
const User = require('../user/user.model');
const Log = require('../log/log.model');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  programName: { type: String, index: { unique: false } },
  logs: [{ type: mongoose.Schema.Types.ObjectId, default: Log, auto: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  username: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule');
