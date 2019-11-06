import express from 'express';
import helper from '../helper';
import ctrl from './article.controller';

const router = new express.Router();

router.post('/articles', helper.authorize, helper.asyncMiddleware(async (req, res) => {
  await ctrl.createArticle(req, res);
}));

router.get('/articles/user/:username', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getArticleByUserName(req, res);
}));

router.get('/articles/latest', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getLatestArticles(req, res);
}));

router.get('/articles/top-rated', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getTopRatedArticles(req, res);
}));

router.get('/article/:_id', helper.asyncMiddleware(async (req, res) => {
  await ctrl.getArticleById(req, res);
}));

export default router;
