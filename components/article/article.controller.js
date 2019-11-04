import Article from './article.model';
import helper from '../helper';
import service from './article.service';
import moment from 'moment';

const createArticle = async (req, res) => {
  try {
    const token = await helper.retrieveToken(req);
    const decode = await helper.decodeToken(token);
    if (decode) {
      const { author, title, banner, article_body } = req.body;
      const article = new Article({
        author: author,
        title: title,
        banner: banner,
        article_body: article_body,
        time_reading: await service.retrieveTimeReading(article_body),
        date: moment().format('L')
      });
      article.save((err, article) => {
        if (err) return res.status(401).json(err);
        else if (article) {
          return res.status(200).json(article);
        } else {
          return res.status(401).json('Not found.');
        }
      });
    }
  } catch (error) {
    res.status(403).json(error);
  }
}

const getArticle = async (req, res) => {
  console.log(req.body);
  res.status(200).json('Hello');
}

export default {
  createArticle,
  getArticle,
}
