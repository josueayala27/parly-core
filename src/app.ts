import express from 'express';
import router from './routes';

const app = express();

app.use('/api', router);

export default app;

// https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths
