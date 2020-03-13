const users = require('express').Router();
const { checkIsValidUser } = require('../utils/utils')
const {
  createUser,
  getUser
} = require('../db/queries/userQueries.js');

//create user
users.post('/new', checkIsValidUser,createUser);

//get user info from database;
users.post('/:uid', checkIsValidUser,getUser);


module.exports = users;
