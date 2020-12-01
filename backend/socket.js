const socketio = require('socket.io');
const io = socketio();
const Message = require('./models/message');

const changeStream = Message.watch();

changeStream.on('change', (change) => {
  console.log(change);
});

const socket = io;
module.exports = socket;
