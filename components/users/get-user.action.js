import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from "babel-dotenv";
import { sendErrorsFromDB } from '../helper';
import User from './user.model';

const getUser = async (req, res) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];

  await jwt.verify(token, AUTH_SECRET, (err, decode) => {
    if (err) return res.status(400).json(err);
    else if (decode) {
      const email = decode.email;
      User.findOne({ email }, (err, user) => {
        if (err) return sendErrorsFromDB(res, err);
        else if (user) res.status(200).send(user);
      });
    } else {
      return res.status(400).send('Error')
    }
  });
}

export default getUser;
