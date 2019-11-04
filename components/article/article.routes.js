import express from 'express';
import helper from '../helper';
import ctrl from './article.controller';

const router = new express.Router();

router.post('/', helper.authorize, helper.asyncMiddleware(async (req, res) => {
  await ctrl.createArticle(req, res);
}));

router.get('/:username', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getArticleByUser(req, res);
}));

export default router;
