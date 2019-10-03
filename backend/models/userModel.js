var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  UserSchema = new Schema({
  name: String,
  //image: String,
  bio: String,
  age: Number,
  year: String,
  month: String,
  date: String,
  univ: String,
  image: String
});

module.exports = mongoose.model('UserModel', UserSchema);
