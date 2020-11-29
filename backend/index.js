const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = express.Router();

const bar = require('/models/foo');

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

const port = 3001;

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

const Message = mongoose.model('Message', schema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/messages', async (req, res) => {
  const foo = await Message.find({});
  res.json(foo.map((o) => o.toJSON()));
});

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
