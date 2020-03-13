const admin = require('./firebase.js');

const checkIsValidUser = async (req, res, next) => {
  const { token } = req.body;

  try {
    console.log(token)
    let decodedToken = await admin.auth().verifyIdToken(token);
    let uid = decodedToken.uid;
    console.log('This is the uid =>', uid);
    next();
  }catch(err){
    console.log('At least we hea', err)
    res.json(err)
  }
}

module.exports = {
  checkIsValidUser
}