import axios from 'axios';
import firebase from '../components/Auth/firebase.js';
const secret = require('../secret.json')

export const setUpUser = async userId => {
  try {
    let token = await firebase.auth ().currentUser.getIdToken (false);
    token = {token: token};
    const userResponse = await axios.post (`/api/users/${userId}`, token);
    return userResponse.data.user;
  } catch (err) {
    console.log (err);
  }
};
export const getTickerInfo = async ticker => {
  return await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${secret.apiToken}`);

}

export const postNewTransaction = async newTransaction => {
  let token = await firebase.auth ().currentUser.getIdToken (false);
  newTransaction.token = {token: token};
  return await axios.post(`api/transactions/new/${newTransaction.uid}`, newTransaction)
}

export const getAllTransactions = async uid => {
  let token = await firebase.auth ().currentUser.getIdToken (false);
  token = {token: token};
  return await axios.post(`api/transactions/${uid}`,token)
}

export const getSymbolPrices = (symbolArr) => {
  let promises = [];
  symbolArr.forEach(symbol => {
    let req = axios({
      url: `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${secret.apiToken}`
    })
    promises.push(req)
  })
  return Promise.all(promises)
}
