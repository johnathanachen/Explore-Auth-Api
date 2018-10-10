const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: { type: String },
  setQuantity: { type: Number },
  repetition: { type: Number },
  weight: { type: String },
}, {
  versionKey: false
});

module.exports = mongoose.model('Exercise', ExerciseSchema, 'exercise');
