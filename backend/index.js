const express = require('express');
const app = express();
const path = require(`path`);
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
// app.use('/rooms', express.static(path.join(__dirname, 'dist')));
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

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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

// mongoose.Promise = require('bluebird');
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
    // { promiseLibrary: require('bluebird') },
    // options
  )
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

app.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/signup', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signup.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

//Checks username and password. kinda
app.post('/login', async (req, res) => {
  const currentUser = req.body.username;
  const password = req.body.password;

  const collection = client.db('chatapp').collection('user');

  async function checkUser(username, password) {
    //... fetch user from a db etc.

    const query = { username: username };
    const options = { projection: { _id: 0, password: 1 } };

    const user = await collection.findOne(query, options);

    console.log(user);

    const match = await bcrypt.compare(password, user.password);

    //TODO: Routing here!!
    if (match) {
      console.log('LOGIN');
    } else {
      console.log('ERROR');
    }
  }
  checkUser(currentUser, password);
  res.redirect('/login');
});

//Creates new document with username, password and hashed password to user collection
app.post('/signup', async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  //For testing
  const currentUser = req.body.username;

  console.log({
    username: req.body.username,
    password: req.body.password,
    passHash: passwordHash,
  });

  const collection = client.db('chatapp').collection('user');
  const user = { username: req.body.username, password: passwordHash };

  // perform actions on the collection object
  collection.insertOne(user);
  res.redirect('/');
  console.log('1 document inserted');

  const users = collection
    .find({ username: currentUser })
    .toArray()
    .then((results) => {
      console.log(results);
    })
    .catch((error) => console.error(error));
});

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
