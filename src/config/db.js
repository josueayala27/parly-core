import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  DATABASE,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const sequelize = new Sequelize(
  `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`
);

export default sequelize;
