const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  date: { type: Date, default: Date, auto: true },
  name: { type: String },
  setQuantity: { type: Number },
  repetition: { type: Number },
  weight: { type: String },
});

module.exports = ExerciseSchema;
