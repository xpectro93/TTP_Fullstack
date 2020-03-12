const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

const index = require('./routes/index.js');
const users = require('./routes/users.js');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.use('/api/', index);
app.use('/api/users', users);


//error handling;
app.use((err, req, res, next) => {
  res.status(500).json({
    err
  });
});

app.listen(port, () => console.log('Listening on =>', port));

