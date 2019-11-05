import mongoose from 'mongoose';
import Article from '../components/article/article.model';
import { DB_NAME, DB_USER, DB_USER_PASS } from 'babel-dotenv';

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
  useNewUrlParser: true,
  auth: {
    user: DB_USER,
    password: DB_USER_PASS
  },
});

try {
  Article.find((err, articles) => {
    if (err) return console.log(err);
    else if (articles.length !== 0) {
      articles.forEach(element => {
        element.likes = Math.floor(Math.random() * 100);
        element.save();
      });
    }
  });
} catch (error) {
  console.log(error);
  mongoose.connection.close()
} finally {
  mongoose.connection.close()
}

