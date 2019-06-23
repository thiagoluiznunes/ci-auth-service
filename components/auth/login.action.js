import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../users/user.model';
import { AUTH_SECRET } from "babel-dotenv";

const login = (req, res) => {
  const email = req.body.email || '';
  const password = req.body.password || '';

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { id: user.id, email: user.email };
      const options = { algorithm:  'HS256', expiresIn: '1 day' };
      const token = jwt.sign(payload, AUTH_SECRET, options);
      const { name, email } = user;

      res.json({ name, email, token });
    } else {
      return res.status(400).send({ errors: 'Usuário/Senha inválidos' });
    }
  });
};

export default login;
