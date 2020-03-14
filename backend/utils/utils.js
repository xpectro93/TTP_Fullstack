const admin = require('./firebase.js');

const checkIsValidUser = async (req, res, next) => {
  const { token } = req.body;

  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    decodedToken.uid;
    next();
  }catch(err){
    res.json(err)
  }
}

module.exports = {
  checkIsValidUser
}