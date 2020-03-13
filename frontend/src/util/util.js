import axios from 'axios';
import firebase from '../components/Auth/firebase.js';

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
