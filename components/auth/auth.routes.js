import express from 'express';
import helper from '../helper';
import signup from './signup.action';
import login from './login.action';
import forgot from './forgot.action';

const router = new express.Router();

router.post('/login', helper.asyncMiddleware( async (req, res) => {
  await login(req, res);
}));

router.post('/signup', helper.asyncMiddleware(async (req, res) => {
  await signup(req, res);
}));

router.post('/forgot-password', helper.asyncMiddleware(async (req, res) => {
  await forgot(req, res);
}));

export default router;
