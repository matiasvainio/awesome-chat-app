var mongoose = require('mongoose'), Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  sender: String,
  created_date: { type: Date, default: Date.now },
  content: String
});

module.exports = mongoose.model('Message', MessageSchema);