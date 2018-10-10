const mongoose = require('mongoose');
const Log = require('../log/log.model');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  programId: { type: String },
  programName: { type: String },
  logs: [{ type: mongoose.Schema.Types.ObjectId, ref: Log }],
}, {
  versionKey: false
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule');
