const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();
app.use(cors());

const room = require('./routes/room');
const message = require('./routes/message');
const user = require('./routes/user');

const loginRouter = require('./routes/login');

const Message = require('./models/message');
const Room = require('./models/room');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const changeStream = Message.watch();

changeStream.on('change', (change) => {
  io.emit('change', change.fullDocument);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use('/api/rooms', room);
app.use('/api/users', user);
app.use('/api/messages', message);
app.use('/api/login', loginRouter);

const roomStream = Room.watch();

roomStream.on('change', (change) => {
  io.emit('change-user', change.fullDocument);
});

io.on('connect', (socket) => {
  socket.on('user-disconnect', (data) => {
    console.log(data);

    io.emit('current-users', data);
  });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.locals.io = io;

module.exports = app;
