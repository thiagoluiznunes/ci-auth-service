import auth from '../components/auth/auth.routes';
import user from '../components/user/user.routes';
import article from '../components/article/article.routes';

const init = (app) => {
  app.use('/api/v1', auth);
  app.use('/api/v1', user);
  app.use('/api/v1', article);
}

export default { init };
