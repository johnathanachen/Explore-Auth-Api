const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  userId: { type: String },
  date: { type: Date, default: Date.now },
  exercise: { type: String },
  repetition: { type: String },
  weight: { type: String }
}, {
  versionKey: false
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule');
