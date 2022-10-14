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

const sync = async () => {
  try {
    await sequelize.sync();
    console.log(`${chalk.green('ℹ')} Database synced successfully.`);
  } catch (error) {
    console.log(chalk.red(`✖ ${error}`));
  }
};

sync();

export default sequelize;

// postgres://postgres:postgrespw@localhost:55000
