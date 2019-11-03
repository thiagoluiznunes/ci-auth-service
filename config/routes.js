import auth from '../components/auth/auth.routes';
import users from '../components/user/users.routes';
import article from '../components/article/article.routes';

const init = (app) => {
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/users', users);
  app.use('/api/v1/article', article);
}

export default { init };
