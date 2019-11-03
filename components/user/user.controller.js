import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import helper from '../helper';
import User from './user.model';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /.{6,12}/;

const getUser = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token', 'authorization'];
  try {
    const decode = await helper.decodeToken(token);
    if (decode) {
      const email = decode.email;
      User.findOne({ email }, (err, user) => {
        if (err) return helper.sendErrorsFromDB(res, err);
        else if (user) res.status(200).send(user);
      });
    } else {
      return res.status(404).send('Not found.');
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

const patchUser = async (req, res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token', 'authorization'];
  const body = Object.entries(req.body)
  try {
    const decode = await helper.decodeToken(token);
    if (decode) {
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
      return res.status(404).send('Not found.');
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

export default {
  getUser,
  patchUser,
};
