const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
});

userSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    returnableObject.id = object._id;
    delete returnableObject.__v;
    delete returnableObject.passwordHash;
    return returnableObject;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;
