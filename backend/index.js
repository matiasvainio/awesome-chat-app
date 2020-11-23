const express = require('express');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello World!');
});

// git test

app.listen(port, () => {
  console.log(`app listenting at http://localhost:${port}`);
});
