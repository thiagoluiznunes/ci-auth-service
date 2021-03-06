import createError from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './config/routes';
import cors from './config/cors';
import db from './config/db';

const app = express();

app.use(logger('dev'));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes.init(app);
db.initConnection();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
