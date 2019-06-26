import jwt from 'jsonwebtoken';
import mailer from './mailer.action';
import helper from '../helper';
import { AUTH_SECRET } from "babel-dotenv";
import User from '../users/user.model';

const emailRegex = /\S+@\S+\.\S+/;

const forgotPassword = (req, res) => {
  const email = req.body.email || '';
  if (!email.match(emailRegex)) {
    return res.status(400).send({ errors: ['Email invalid!'] });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return helper.sendErrorsFromDB(res, err);
    } else if (user) {
      const token = jwt.sign(user.toJSON(), AUTH_SECRET, {
        expiresIn: '5 minute'
      });
      user.resetPasswordToken = token;
      user.save((err) => {
        if (err) {
          return helper.sendErrorsFromDB(res, err);
        }
        res.status(200).send('Token updated');
        mailer(req, email, token);
      });
    } else {
      return res.status(400).send({ errors: ['Email not found'] });
    }
  });
};

export default forgotPassword;
