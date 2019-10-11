import auth from '../components/auth/auth.routes';
import users from '../components/user/users.routes';

const init = (app) => {
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/users', users);
}

export default { init };
