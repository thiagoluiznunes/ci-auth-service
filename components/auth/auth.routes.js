import express from 'express';
import signup from './signup.action';
import login from './login.action';
import forgot from './forgot.action';
import getUser from './get-user.action';

const router = new express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.post('/login', asyncMiddleware( async (req, res) => {
  await login(req, res);
}));

router.post('/signup', asyncMiddleware(async (req, res) => {
  await signup(req, res);
}));

router.post('/forgot-password', asyncMiddleware(async (req, res) => {
  await forgot(req, res);
}));

router.get('/users', asyncMiddleware(async (req, res) => {
  await getUser(req, res);
}));


export default router;
