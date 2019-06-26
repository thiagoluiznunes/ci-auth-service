import express from 'express';
import helper from '../helper';
import getUser from './get-user.action';
import patchUser from './patch-user.action';

const router = new express.Router();

router.get('/', helper.asyncMiddleware(async (req, res) => {
  await getUser(req, res);
}));

router.patch('/', helper.asyncMiddleware(async (req, res) => {
  await patchUser(req, res);
}));

export default router;
