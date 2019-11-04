import Article from './article.model';
import User from '../user/user.model';
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
      await User.findById(decode.id, async (err, user) => {
        if (err) return res.status(401).json(err);
        else if (user) {
          const { _id } = await article.save();
          user.articles.push(_id);
          user.save();
          return res.status(200).json({ message: 'Artigo criado com sucesso ' });
        } else {
          return res.status(401).json({ message: 'Falha ao criar artigo. Tente novamente.' });
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
