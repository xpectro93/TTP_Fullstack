const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const index = require('./routes/index.js');
const users = require('./routes/users.js');
const transactions = require('./routes/transactions.js');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")))


//Routes
app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/transactions', transactions);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

//error handling;
app.use((err, req, res, next) => {
  res.status(500).json({
    err
  });
});

app.listen(port, () => console.log('Listening on =>', port));

