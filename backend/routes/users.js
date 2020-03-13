const users = require('express').Router();
const { checkIsValidUser } = require('../utils/utils')
const {
  createUser,
  getUser
} = require('../db/queries/userQueries.js');

//create user
users.post('/new', createUser);
users.post('/:uid', checkIsValidUser,getUser);


module.exports = users;
