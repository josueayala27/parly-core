import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import cors from 'cors';
import router from './routes';
import createError from './utils/createError';

const app = express();

app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((_req, _res, next) => {
  next(createError(httpStatus.NOT_FOUND, 'Page not found.'));
});

app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({
    status: 'Error',
    message: error.message,
  });
});

export default app;

// https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths
