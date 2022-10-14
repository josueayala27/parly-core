import { Sequelize } from 'sequelize';
import chalk from 'chalk';

const {
  DATABASE,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: 'postgres',
  logging: false,
});

sequelize.sync().then(
  () => {
    console.log(`${chalk.green('ℹ')} Database synced successfully.`);
  },
  (err) => {
    console.log(chalk.red(`✖ ${err}`));
  }
);

export default sequelize;

// postgres://postgres:postgrespw@localhost:55000
