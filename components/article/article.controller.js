import Article from './article.model';


const createArticle = async (req, res) => {
  console.log(req.body);

  res.status(200).json('Hello');
}

const getArticle = async (req, res) => {
  console.log(req.body);
  res.status(200).json('Hello');
}

export default {
  createArticle,
  getArticle,
}
