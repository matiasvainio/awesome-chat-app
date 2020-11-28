const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = new mongoose.Schema({
  roomId: Number,
  content: String,
  date: { type: Date, default: Date.now },
  user: String,
});

messageSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    delete returnableObject.__v;
    delete returnableObject.passwordHash;
    return returnableObject;
  },
});

messageSchema.plugin(uniqueValidator);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
