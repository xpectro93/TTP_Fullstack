const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
  res.status(200).json({
    message:'Test successful'
  })
})

//error handling;
app.use((err, req, res, next) => {
  res.status(500).json({
    err
  });
});

app.listen(port, () => console.log('Listening on =>', port));

