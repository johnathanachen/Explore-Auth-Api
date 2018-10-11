const mongoose = require('mongoose');
const User = require('../user/user.model');

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  name: { type: String },
  duration: { type: String },
  exercises: [{ type: String }],
  frequency: { type: String },
  repetition: { type: Number },
  setQuantity: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false },
}, {
  versionKey: false
});

module.exports = mongoose.model('Program', ProgramSchema, 'program');
