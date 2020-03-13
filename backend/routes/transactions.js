const { any, none } = require('./index.js');

const getAllUserTransactions = async ( req, res, next ) => {
  const uid = req.params.uid;
  try {
    const transactions = await any ('SELECT * FROM transactions WHERE uid=$1', uid);
    res.status (200).json({
      message:"All transactions by specific user retrieved",
      transactions
    })
  } catch (err) {
    next(err)
  }
  
}

// id SERIAL PRIMARY KEY,
//   uid VARCHAR REFERENCES users(uid),
//   ticker_symbol VARCHAR NOT NULL,
//   transaction_type VARCHAR,
//   shares INT,
//   price FLOAT NOT NULL

const createTransaction = async (req, res, next) => {
  const newTransaction = req.body;
  try {
    await none ('INSERT INTO transactions (uid, ticker_symbol, transaction_type, shares, price)', newTransaction);
    res.status (200).json({
      message:"Create new transactions"
    })
  } catch (err) {
    next (err)
  }

}

module.exports = {
  getAllUserTransactions,
  createTransaction
}
