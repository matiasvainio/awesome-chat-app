const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const message = require('./routes/message.js');
const room = require('./routes/room.js');
const user = require('./routes/user.js');

const app = express();
app.use(cors());
app.use('/message', message);
app.use('/room', room);
app.use('/user', user);

const uri =
  'mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongodb connection established');
});

const port = 3000;

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
