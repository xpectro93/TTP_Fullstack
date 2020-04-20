import fb from 'firebase/app';
import 'firebase/auth';
const secret = require('../../secret.json')

const firebase = fb.initializeApp({
  apiKey: secret.apiKey,
  authDomain: "stonks-d0e0b.firebaseapp.com",
  databaseURL: "https://stonks-d0e0b.firebaseio.com",
  projectId: "stonks-d0e0b",
  storageBucket: "stonks-d0e0b.appspot.com",
  messagingSenderId: "961360163073",
  appId: "1:961360163073:web:02e8d6180681976b0d6b00",
  measurementId: "G-EV7RSGT5BE"
});



export default firebase;