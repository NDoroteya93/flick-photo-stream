const queries = require('./../query');
const { createToken } = require('./../../authenticate/util');
const { hashPassword, verifyPassword } = require('../util');
const jwtDecode = require('jwt-decode');

const postUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);  

    const userData = {
      email: req.body.email.toLowerCase(),
      givenName: req.body.givenName,
      familyName: req.body.familyName, 
      password: hashedPassword,
      created: new Date()
    };

    const existingEmail = await queries.getUserByEmail(userData.email);

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Pass the userData to the query responsible for
    // creating the user
    const user = await queries.createUser(userData);
    if (user) {
      req.session.user = user;
      req.session.isAuthenticated = true;

      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const userInfo = {
        email: user.email,
        givenName: user.givenName,
        familyName: user.familyName, 
        role: user.role,
        created: user.created
      };

      res.cookie('token', token, { maxAge: 360000, httpOnly: true });

      return res.json({
        message: 'User created!',
        token,
        userInfo,
        expiresAt
      });
    } else {
      return res
        .status(400)
        .json({ message: 'There was a problem creating your account' });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'There was a problem creating your account' });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    debugger;
    console.log(req);
    const email = req.query.email.toLowerCase();
    const existingEmail = await queries.getUserByEmail(email);
    if (existingEmail) {
      return res.json({ emailTaken: true });
    }
    return res.json({ emailTaken: false });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'There was a problem checking the email' });
  }
};

const getUserByGivenName = async (req, res) => {
  try {
    const givenName = req.query.givenName;
    const existingGivenName = await queries.getUserByGivenName(givenName);
    if (existingGivenName) {
      return res.json({ givenNameTaken: true });
    }
    return res.json({ givenNameTaken: false });
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'There was a problem checking the given name' });
  }
};

const getUserById = async (req, res) => { 
  try { 
    const userId = req.query.id;
    const existingUserId = await queries.getUserById(userId);

    console.log(existingUserId);

    if (existingUserId) {
      return res.json({ userIdTaken: true });
    }
    
    return res.json({ userIdTaken: false });
  } catch(err) { 
    return res
      .status(400)
      .json({ message: 'There was a problem checking the id' });
  }
}

const updateUser = async (req, res) => { 
  try { 
    const user = req.body.user;
    const existingUser = await queries.updateUser(user);

    if (existingUser) { 
      return res.json({ userIsUpdated: true });
    }

    return res.json({ userIsUpdated: false });
  } catch (err) { 
    return res
      .status(400)
      .json({ message: 'There was a problem updating the user'});
  }
}

const deleteUser = async (req, res) => { 
  try { 
    const userId = req.params.id;
    await queries.deleteUser(userId);
    res.json({ message: 'User deleted' });
  } catch (err) { 
    console.log(err);
    return err;
  }
}

module.exports = { 
  postUser,
  getUserByEmail,
  getUserByGivenName, 
  getUserById, 
  updateUser, 
  deleteUser
};
