const express = require('express');
const app = express();
const path = require(`path`);
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

client.connect((err) => {});

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

//Creates new message with sender and content to message collection
app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message,
  });

  const collection = client.db('chatapp').collection('message');
  const message = { sender: req.body.name, content: req.body.message };

  // perform actions on the collection object
  collection.insertOne(message);
  console.log('1 document inserted');
  res.redirect('/submit');

  const messages = collection
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
    })
    .catch((error) => console.error(error));
});

//Checks username
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
