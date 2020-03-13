const transactions = require('express').Router();
const { checkIsValidUser } = require('../utils/utils')
const {
  getAllUserTransactions,
  createTransaction
} = require('../db/queries/transactionQueries.js');

//get all transactions by user;
transactions.post('/:uid',checkIsValidUser, getAllUserTransactions);

//create new transaction;
transactions.post('/new/:uid', checkIsValidUser,createTransaction);


module.exports = transactions;
