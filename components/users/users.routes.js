import express from 'express';
import helper from '../helper';
import getUser from './get-user.action';

const router = new express.Router();

router.get('/', helper.asyncMiddleware(async (req, res) => {
  await getUser(req, res);
}));

export default router;
