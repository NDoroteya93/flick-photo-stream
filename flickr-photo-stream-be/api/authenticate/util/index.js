const jwt = require('jsonwebtoken');

const createToken = user => { 
  return jwt.sign({
    email: user.email, 
    givenName: user.givenName, 
    familyName: user.familyName, 
    created: new Date(), 
    iss: 'api.flickr-photo.com', 
    aud: 'api.flickr-photo.com', 
  }, 
  process.env.JWT_SECRET,
  { algorithm: 'HS256', expiresIn: '2h' }
  );
};

module.exports = { createToken };