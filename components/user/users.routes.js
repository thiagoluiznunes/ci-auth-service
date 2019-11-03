import express from 'express';
import helper from '../helper';
import ctrl from './user.controller';

const router = new express.Router();

router.get('/', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getUser(req, res);
}));

router.patch('/', helper.asyncMiddleware(async (req, res) => {
  await ctrl.patchUser(req, res);
}));

export default router;
