const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require(`path`);

const app = express();
const router = express.Router();

app.use(cors());

const uri =
  'mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majorityy';
// const client = new MongoClient(uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb connection established');
});

const port = 3000;

const schema = new mongoose.Schema({
  content: String,
});

schema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    // eslint-disable-next-line no-underscore-dangle
    returnableObject.id = object._id.toString();
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject.__v;
    return returnableObject;
  },
});

const Message = require('../backend/models/message');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/messages', async (req, res) => {
  const foo = await Message.find({ roomId: 2 });
  res.json(foo.map((o) => o.toJSON()));
});

app.get('/newmessage', async (req, res) => {
  res.sendFile(path.join(__dirname, '/views/message.html'));
});

app.post('/newmessage', async (req, res) => {
  const newMessage = new Message({
    id: 2,
    roomId: 2,
    user: 'Jonitesti',
    content: 'Asdasdaasd',
  });
  newMessage.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('/messages');
});

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
