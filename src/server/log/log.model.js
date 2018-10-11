const mongoose = require('mongoose');
const Exercise = require('../exercise/exercise.model');
const User = require('../user/user.model');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  scheduleId: { type: mongoose.Schema.Types.ObjectId },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, default: Exercise }]
}, {
  versionKey: false
});

module.exports = mongoose.model('Log', LogSchema, 'log');
