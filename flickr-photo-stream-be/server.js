require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * @name Cross-Origin Resourse Sharing
 * @param  {} cors(
 * @description Required if we serve our API at a 
 * different origin than the Angular app
 */
app.use(cors());

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false, 
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
})); 

app.use(cookieParser());

const attachUser = (req, res, next) => { 
  const token = req.cookies.token; 
  if (!token) { 
    return res
        .status(401)
        .json({ message: 'Authentication invalid' });
  }
  const decodeToken = jwtDecode(token);

  if (!decodeToken) { 
    return res
      .status(401)
      .json({ message: 'There was a problem authorizing the request' });
  } else { 
    req.user = decodeToken;
    next();
  }
};

const checkSession = (req, res, next) => {
  if (req.session.user && req.session.isAuthenticated) { 
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

const checkJwt = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      audience: 'api.flickr-photo.com',
      issuer: 'api.flickr-photo.com',
    });
    console.log(decoded);
    next();
  } catch (e) { 
    return res.status(403).json({ message: 'Access denied' });
  }
};

const makeCsrToken = (req, res, next) => { 
  res.cookie('csrf-token', req.csrfToken());
  next();
};

// User routes
app.use('/api/users', require('./api/users'));

// Auth routes
app.use('/api/authenticate', require('./api/authenticate'));

// app.use(csrf({ cookie: true }));
// app.use(makeCsrToken);
// app.use(attachUser);


// The authenticate middleware is applied before
// the photostream endpoint so that can it be protected
// app.use(checkJwt);

// Photostream routes
app.use('/api/photostreams', require('./api/photostreams'));

async function connect() { 
  try { 
    mongoose.Promise = global.Promise;
    await mongoose.connect('mongodb://localhost:27017/flickr-photo-stream' || process.env.MLAB_URL, { useNewUrlParser: true });
    await console.log('connected to db');
  } catch (err) { 
    console.log('Mongoose error', err);
  }

  app.listen(3000);
  console.log('API listening on localhost:3000');
}

connect();
