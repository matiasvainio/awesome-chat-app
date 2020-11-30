const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomId: Number,
  roomName: String,
});

module.exports = mongoose.model('Room', RoomSchema);
