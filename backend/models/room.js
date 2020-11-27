var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  roomId: Number,
  roomName: String,
});

module.exports = mongoose.model('Room', RoomSchema);
