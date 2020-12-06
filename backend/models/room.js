const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomId: String,
  roomName: String,
  users: [String],
});

RoomSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    returnableObject.id = object._id;
    // returnableObject._id = object.roomId;
    delete returnableObject._id;
    return returnableObject;
  },
});

module.exports = mongoose.model('Room', RoomSchema);
