const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/message');

const app = express();
app.use(cors());

const uri = process.env.MONGODB_URI;

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

io.on('connection', (socket) => {
  console.log('user connected');
});

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
