const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = new mongoose.Schema({
  roomId: Number,
  content: String,
  date: { type: String, default: Date.now },
  user: String,
});

messageSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    delete returnableObject.passwordHash;
    returnableObject.id = object._id.toString();
    delete returnableObject._id;
    return returnableObject;
  },
});

messageSchema.plugin(uniqueValidator);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
