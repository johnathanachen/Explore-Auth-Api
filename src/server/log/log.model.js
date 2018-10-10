const mongoose = require('mongoose');
const Exercise = require('../exercise/exercise.model');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  date: { type: Date, default: Date.now },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: Exercise }]
}, {
  versionKey: false
});

module.exports = mongoose.model('Log', LogSchema, 'log');
