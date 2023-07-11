import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import dotenv from 'dotenv';
import { Database } from '../models';

dotenv.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.PORT,
    ssl: true,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
