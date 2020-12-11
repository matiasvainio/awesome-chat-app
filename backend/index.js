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
const User = require('./models/user');

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

/**
 * Watches the message collection for changes using MongoDB change streams.
 * @name changeStream
 */
changeStream.on('change', (change) => {
  io.emit('change', change.fullDocument);
});

const userStream = User.watch();

/**
 * Watches the user collection for changes using MongoDB change streams.
 * @name userStream
 */
userStream.on('change', (change) => {
  io.emit('user-change');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use('/api/rooms', room);
app.use('/api/users', user);
app.use('/api/messages', message);
app.use('/api/login', loginRouter);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

/**
 * Creating a connection to MongoDB using mongoose.
 * @name mongoose.connect
 * @param {string} MONGODB_URI Environmental variable for database URI
 * @param {json} options Additional options for the connection
 */
mongoose
  .connect(process.env.MONGODB_URI, options)
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
