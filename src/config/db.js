import { Sequelize } from 'sequelize';

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
    console.log('DB connection sucessful.');
  },
  (err) => {
    console.log(err);
  }
);

export default sequelize;
