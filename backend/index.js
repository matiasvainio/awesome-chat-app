const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const message = require('./routes/message.js');
const room = require('./routes/room.js');
const user = require('./routes/user.js');
const Message = require('./models/message');

const app = express();
app.use(cors());

const uri =
  'mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb connection established');
});

const port = 3001;

app.get('/', async (req, res) => {
  const messages = await Message.find({});

  res.json(messages.map((message) => message));
});

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
