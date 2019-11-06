import express from 'express';
import helper from '../helper';
import ctrl from './auth.controller';

const router = new express.Router();

router.post('/auth/login', helper.asyncMiddleware( async (req, res) => {
  await ctrl.login(req, res);
}));

router.post('/auth/signup', helper.asyncMiddleware(async (req, res) => {
  await ctrl.signup(req, res);
}));

router.post('/auth/forgot-password', helper.asyncMiddleware(async (req, res) => {
  await ctrl.forgot(req, res);
}));

export default router;
