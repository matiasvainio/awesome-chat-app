const express = require('express');
const app = express();
const axios = require('axios').default;
const path = require(`path`);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sudo:sudo123@chatapp.7etcu.mongodb.net/chatapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {})

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/form.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.post('/submit', (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message
  });
    const collection = client.db("chatapp").collection("message");
    const  message = {sender: req.body.name, content: req.body.message};
    // perform actions on the collection object
    collection.insertOne(message);
    console.log("1 document inserted");
  });