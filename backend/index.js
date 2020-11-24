const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const app = express();
const port = 3000;

app.get((req, res) => {
  response.send('Hello World!');
  });

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});