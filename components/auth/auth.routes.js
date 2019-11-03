import express from 'express';
import helper from '../helper';
import ctrl from './auth.controller';

const router = new express.Router();

router.post('/login', helper.asyncMiddleware( async (req, res) => {
  await ctrl.login(req, res);
}));

router.post('/signup', helper.asyncMiddleware(async (req, res) => {
  await ctrl.signup(req, res);
}));

router.post('/forgot-password', helper.asyncMiddleware(async (req, res) => {
  await ctrl.forgot(req, res);
}));

export default router;
