import { createServer } from 'http';
import chalk from 'chalk';
import app from './app';

const PORT = process.env.PORT || 3000;
const { APP_URL } = process.env;

const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${chalk.green('ℹ')} Waiting for file changes`);
  }
  console.log(`${chalk.green('ℹ')} Listening on: ${`${APP_URL}:${PORT}`}`);
});
