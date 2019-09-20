var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnivSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }]
});

module.exports = mongoose.model('UnivModel', UnivSchema);
