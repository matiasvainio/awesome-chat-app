const express = require('express');
const app = express();
const path = require(`path`);
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const room = require('./routes/room');
const message = require('./routes/message');
const user = require('./routes/user');

const loginRouter = require('./routes/login');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/rooms', room);
app.use('/api/users', user);
app.use('/api/messages', message);
app.use('/api/login', loginRouter);

// SOCKETIOBS
const SocketSingleton = require('./SocketSingleton');
const http = require('http').createServer(app);
SocketSingleton.configuration(http);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//const uri = "mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });

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
    'mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
    // { promiseLibrary: require('bluebird') },
    // options
  )
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//client.connect(err => {})

// app.get('/', (req, res) => {
//   res.send('Hello from App Engine!');
// });

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/form.html'));
});

app.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/signup', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/signup.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

//Creates new message with sender and content to message collection
app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message,
  });

  //const collection = mongoose.model('Test', new Schema({ name: String }));
  //const  message = {sender: req.body.name, content: req.body.message};

  // perform actions on the collection object
  //collection.insertOne(message);
  console.log('1 document inserted');
  res.redirect('/submit');

  const messages = mongoose.model('Test', new Schema({ sender: String }));
  messages.findOne(function (error, result) {
    sender: Joni;
  });
});

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

module.exports = app;
