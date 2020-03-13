const {any, none} = require ('./index.js');

const getAllUserTransactions = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const transactions = await any (
      'SELECT * FROM transactions WHERE uid=$1',
      uid
    );
    res.status (200).json ({
      message: 'All transactions by specific user retrieved',
      transactions,
    });
  } catch (err) {
    next (err);
  }
};

const createTransaction = async (req, res, next) => {
  const newBalance = {
    balance: req.body.newBalance,
    uid: req.body.uid,
  };
  const newTransaction = {
    uid: req.body.uid,
    ticker_symbol: req.body.ticker_symbol,
    transaction_type: req.body.transaction_type,
    shares: req.body.shares,
    price: req.body.price,
  };
  try {
    await none ('UPDATE users SET balance = $1 WHERE uid = $2', [
      newBalance,
      newTransaction.uid,
    ]);
    await none (
      'INSERT INTO transactions (uid, ticker_symbol, transaction_type, shares, price)',
      newTransaction
    );
    res.status (200).json ({
      message: 'Create new transactions',
    });
  } catch (err) {
    next (err);
  }
};

module.exports = {
  getAllUserTransactions,
  createTransaction,
};
