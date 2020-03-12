const admin = require("firebase-admin");

const serviceAccount = require("../secret.json");

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL: "https://stonks-d0e0b.firebaseio.com"
});
module.exports = admin;