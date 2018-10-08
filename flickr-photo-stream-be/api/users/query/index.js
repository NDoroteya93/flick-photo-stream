const User = require('./../model');

const createUser = async userData => {
  try {
    const newUser = new User(userData);
    return newUser.save();
  } catch (err) {
    return err;
  }
};

const getUser = async usernameOrEmail => {
  try {
    return await User.findOne({
      $or: [{ givenName: usernameOrEmail }, { familyName: usernameOrEmail }, { email: usernameOrEmail }]
    });
  } catch (err) {
    return err;
  }
};

const getUserById = async id => {
  try {
    return await User.findone({ _id: id });
  } catch (err) {
    return err;
  }
};

const getUserByGivenName = async givenName => {
  try {
    return await User.findOne({ givenName });
  } catch (err) {
    return err;
  }
};

const getUserByEmail = async email => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    return err;
  }
};


const updateUser = async user => { 
  try { 
    return await User.update({ _id: user._id }, { ...user }, { upsert: true });
  } catch (err) { 
    return err;
  }
}

const deleteUser = async id => { 
  try { 
    return await User.findOneAndRemove({ _id: id });
  } catch (err) { 
    console.log(err);
    return err;
  }
}

module.exports = { 
  createUser,
  getUser,
  getUserById, 
  getUserByGivenName, 
  getUserByEmail,
  updateUser, 
  deleteUser
 };
