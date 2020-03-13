const transactions = require('express').Router();
const { checkIsValidUser } = require('../utils/utils')
const {
  getAllUserTransactions,
  createTransaction
} = require('../db/queries/transactionQueries.js');

//create new transaction;
transactions.post('/new/:uid', createTransaction);

//get all transactions by user;
transactions.post('/:uid',checkIsValidUser, getAllUserTransactions);




module.exports = transactions;
