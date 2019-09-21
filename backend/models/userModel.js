var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  UserSchema = new Schema({
  name: String,
  //image: String,
  bio: String,
  age: Number,
  birth: String,
  univ: String
});

module.exports = mongoose.model('UserModel', UserSchema);
