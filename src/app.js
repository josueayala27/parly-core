import express from 'express';
import xss from 'xss-clean';
import httpStatus from 'http-status';
import routes from './routes';
import createError from './utils/createError';
import './models/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use('/api', routes);

app.use((_, res, next) => {
  next(createError(httpStatus.NOT_FOUND, 'Page not found'));
});

app.use((error, _, res, next) => {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({
    status: 'Error',
    message: error.message,
  });
});

export default app;
