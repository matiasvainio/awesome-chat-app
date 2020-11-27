var mongoose = require('mongoose'), Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  name: String,
  users: [String],
});

module.exports = mongoose.model('Room', RoomSchema);