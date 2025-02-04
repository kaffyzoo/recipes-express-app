const express = require('express')
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).json({
    result: 'Hi!'
  });
});

app.listen(port, () => {
  console.log('App is running at port: ', port);
});
