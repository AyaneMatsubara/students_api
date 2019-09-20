var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  UserSchema = new Schema({
  name: String,
  //image: String,
  bio: String,
  age: Number,
  //birth: String,
  univ: { type: Schema.Types.ObjectId, ref:'UnivModel' }
});

module.exports = mongoose.model('UserModel', UserSchema);
