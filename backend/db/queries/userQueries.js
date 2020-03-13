const { one } = require('./index.js');

const createUser =async ( req, res, next ) => {
  console.log(req.body)
  try {
    const newUser = await one (
      'INSERT INTO users (uid, username, email) VALUES (${uid},${username},${email}) RETURNING *',req.body
    );
    res.status (200).json({
      message: 'New User has been added',
      newUser
    })
  } catch (err) {
    console.log(err)
    next(err.message = 'yikes')
  }
}

const getUser = async ( req, res, next ) => {
  const { uid } = req.params;
  try {
    const user = await one ('SELECT * FROM users WHERE uid=$1', uid);

    res.status (200).json ({
      message:'User has been retrieved',
      user
    });

  } catch (err) {
    next(err);
  };
};

module.exports = {
  createUser,
  getUser
}
