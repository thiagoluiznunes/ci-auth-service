import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AUTH_SECRET } from "babel-dotenv";
import helper from '../helper';
import User from './user.model';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /.{6,12}/;

const patchUser = async (req, res) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  const body = Object.entries(req.body)

  await jwt.verify(token, AUTH_SECRET, (err, decode) => {
    if (err) return res.status(400).json(err);
    else if (decode) {
      const email = decode.email;
      User.findOne({ email }, async (err, user) => {
        if (err) return helper.sendErrorsFromDB(res, err);
        else if (user) {
          for (let i = 0; i < body.length; i++) {
            const value = body[i];
            if (value[0] === 'email' && !value[1].match(emailRegex)) {
              return res.status(400).send({ errors: ['Email inválido!'] });
            }
            else if (value[0] === 'password' && !value[1].match(passwordRegex)) {
              return res.status(400).send({ errors: ['A senha deve conter entre 6 a 12 elementos!'] });
            }
            else if (value[0] === 'name' && value[1] === '') {
              return res.status(400).send({ errors: ['Nome de inválido'] });
            }
            else if (value[0] === 'name') {
              user.name = value[1];
            } else if (value[0] === 'email' && value[1].match(emailRegex)) {
              user.email = value[1];
            } else if (value[0] === 'password' && value[1].match(passwordRegex)) {
              const salt = bcrypt.genSaltSync();
              const passwordHash = bcrypt.hashSync(value[1], salt);
              user.password = passwordHash;
            }
          }
          await user.save();
          res.status(200).send(user);
        }
      });
    } else {
      return res.status(400).send('Error')
    }
  });
}

export default patchUser;
