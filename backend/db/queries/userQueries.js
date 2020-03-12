const { one } = require('./index.js');

const createUser =async ( req, res, next ) => {
  try {
    const newUser = await one (
      'INSERT INTO users (uid, username, email, balance) VALUES (${uid},${username},${email}, ${balance}) RETURNING *'
    );
    res.status (200).json({
      message: 'New User has been added',
      newUser
    })
  } catch ( err ) {
    next(err)
  }
}

const getUser = async ( req, res, next ) => {
  const { uid } = req.params;
  try {
    const user = await one ('SELECT * FROM users WHERE uid=$1', uid);

    res.status (200).json ({
      message:'User has been retrieved',
      user,
      uid
    });

  } catch (err) {
    next(err);
  };
};

module.exports = {
  createUser,
  getUser
}
