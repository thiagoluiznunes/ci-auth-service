import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import helper from '../helper';
import User from '../user/user.model';
import { AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD } from 'babel-dotenv';

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /.{6,12}/;

const signup = async (req, res) => {
  const name = req.body.name || '';
  const email = req.body.email || '';
  const password = req.body.password || '';
  const confirmPassword = req.body.confirm_password || '';

  if (!email.match(emailRegex)) return res.status(400).send({ message: 'Email inválido!' });
  if (!password.match(passwordRegex)) return res.status(400).send({ message: 'A senha deve conter entre 6 a 12 elementos!' });

  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  if (!bcrypt.compareSync(confirmPassword, passwordHash)) return res.status(400).send({ message: 'Senhas não conferem!' });

  User.findOne({ email }, (err, user) => {
    if (err) return helper.sendErrorsFromDB(res, err);
    else if (user) return res.status(400).send({ message: 'Email já cadastrado!' });

    const newUser = new User({ name, email, password: passwordHash });
    newUser.save((err) => {
      if (err) return helper.sendErrorsFromDB(res, err);
      return res.status(200).send({ message: 'Registro realizado com sucesso!' });
    });
  });
};

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
      return res.status(400).send({ message: 'Usuário/Senha inválidos' });
    }
  });
};

const mailer = (req, email, token) => {
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_PASSWORD
    }
  });

  const emailToSend = {
    from: ADMIN_EMAIL,
    to: email,
    subject: 'Reset password',
    html: `
    You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
    <a href="http://${req.headers.host}/resetPassword/${token}">link to reset</a>
    If you did not request this, please ignore this email and your password will remain unchanged.
    ` };

  transport.sendMail(emailToSend, (err, info) => {
    if (err) {
      return { error: err };
    }
    return { message: 'Email sent with success', information: info };
  });
};

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

export default {
  signup,
  login,
  forgotPassword,
}
