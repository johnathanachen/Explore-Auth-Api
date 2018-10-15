const mongoose = require('mongoose');
const Exercise = require('../exercise/exercise.model');
const User = require('../user/user.model');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  programName: { type: String, index: { unique: false } },
  logs: [Exercise],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  username: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule');
