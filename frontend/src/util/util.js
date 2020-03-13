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
  let resp = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${secret.apiToken}`);
  return resp
}

export const postNewTransaction = async newTransaction => {
  let token = await firebase.auth ().currentUser.getIdToken (false);
  newTransaction.token = {token: token};
  console.log('new',newTransaction)
  let resp = await axios.post(`api/transactions/new/${newTransaction.uid}`, newTransaction)
  return resp;
}
