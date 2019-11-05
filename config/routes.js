import auth from '../components/auth/auth.routes';
import user from '../components/user/user.routes';
import article from '../components/article/article.routes';

const init = (app) => {
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/users', user);
  app.use('/api/v1/articles', article);
}

export default { init };
