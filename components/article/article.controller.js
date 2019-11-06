import Article from './article.model';
import User from '../user/user.model';
import helper from '../helper';
import service from './article.service';

const createArticle = async (req, res) => {
  try {
    const token = await helper.retrieveToken(req);
    const decode = await helper.decodeToken(token);
    const validate = await service.validateBodyFields(req);

    if (validate) {
      res.status(401).json({ message: validate });
    }
    else if (decode) {
      const { author, title, banner, article_body, brief_description } = req.body;
      const article = new Article({
        user_id: decode.id,
        username: decode.username,
        author: author,
        title: title,
        banner: banner,
        article_body: article_body,
        brief_description: brief_description,
        time_reading: await service.retrieveTimeReading(article_body),
      });
      await User.findById(decode.id, async (err, user) => {
        if (err) return res.status(401).json(err);
        else if (user) {
          await article.save();
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

const getArticleByUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = await User.findOne({ username: username }, '_id');
    if (userId) {
      Article.find({ user_id: userId }, (err, articles) => {
        if (err) return res.status(401).json(err);
        else if (articles.length !== 0) return res.status(200).json({ data: articles });
        return res.status(404).json({ message: 'Este usuário não possui artigos.' });
      });
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const getLatestArticles = async (req, res) => {
  try {
    Article.find((err, articles) => {
      if (err) return res.status(401).json(err);
      else if (articles.length !== 0) return res.status(200).json(articles);
      return res.status(404).json({ message: 'Artigos não encontrados.' });
    })
      .select('_id author username title banner brief_description time_reading createdAt')
      .sort({ _id: -1 })
      .limit(5);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getTopRatedArticles = async (req, res) => {
  try {
    Article.find((err, articles) => {
      if (err) return res.status(401).json(err);
      else if (articles.length !== 0) return res.status(200).json(articles);
      return res.status(404).json({ message: 'Artigos não encontrados.' });
    })
      .select('_id author username title banner brief_description time_reading createdAt')
      .sort({ likes: -1 })
      .limit(10);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getArticleById = async (req, res) => {
  const { _id } = req.params;
  try {
    Article.findById(_id, (err, article) => {
      if (err) return res.status(401).json(err);
      else if (article) return res.status(200).json(article);
      return res.status(404).json({ message: 'Artigo não encontrado.' });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default {
  createArticle,
  getArticleByUserName,
  getLatestArticles,
  getTopRatedArticles,
  getArticleById,
}
