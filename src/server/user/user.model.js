const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },

  username: { type: String, unique: false, required: false },
  password: { type: String, required: true },
  first: { type: String, required: false },
  admin: { type: Boolean }

});

UserSchema.methods.setPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserSchema.methods.validatePassword = password => bcrypt.compareSync(password, this.local.password);

UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    admin: this.admin,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, config.jwtSecret);
};

UserSchema.methods.toAuthJSON = () => ({
  _id: this._id,
  username: this.username,
  token: this.generateJWT(),
});


module.exports = mongoose.model('User', UserSchema, 'users');
