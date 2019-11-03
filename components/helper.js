import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from 'babel-dotenv';

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const sendErrorsFromDB = (res, dbErrors) => {
  const errors = [];
  _.forIn(dbErrors.errors, error => errors.push(error.message));
  return res.status(400).json({ errors });
};

const generateToken = async (data) => {
  return jwt.sign(data, AUTH_SECRET, { expiresIn: '365d' });
}

const decodeToken = async (token) => {
  return jwt.verify(token, AUTH_SECRET);
}

const authorize = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token', 'authorization'];

  if (!token) {
    res.status(403).json({
      message: 'Unauthorized access.'
    });
  } else {
    jwt.verify(token, AUTH_SECRET, (error) => {
      if (error) {
        res.status(403).json({
          message: 'Unauthorized token.'
        });
      } else {
        next();
      }
    });
  }
};

export default {
  asyncMiddleware,
  sendErrorsFromDB,
  generateToken,
  decodeToken,
  authorize,
};
