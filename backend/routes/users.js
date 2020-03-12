const users = require('express').Router();
const { checkIsValidUser } = require('../utils/utils')
const {
  createUser,
  getUser
} = require('../db/queries/userQueries.js');

//create user
users.post('/new', createUser);

//check if user exists;
users.post('/test', checkIsValidUser,(req, res, next)=> {
  res.json({
    message:'User exists, now u may login'
  });
});

module.exports = users;
