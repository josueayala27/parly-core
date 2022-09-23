import express from 'express';
import routes from './routes';
import xss from 'xss-clean';
import createError from './utils/createError';
import httpStatus from 'http-status';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.use('/api', routes);

app.use((req, res, next) => { next(createError(httpStatus.NOT_FOUND, "Page not found")) });
app.use((error, req, res, next) => {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({
    status: "Error",
    message: error.message
  })
});

export default app;