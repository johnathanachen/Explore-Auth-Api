const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },

  username: { type: String, unique: true, required: true },
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

UserSchema.pre('save', (next) => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  // user.password = user.setPassword();
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (hash) => {
      user.password = hash;
      next();
    });
  });
  return 'done';
});

UserSchema.methods.comparePassword = (password, done) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema, 'users');
