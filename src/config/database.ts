import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '../models';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'verceldb',
    host: 'ep-restless-bush-063758-pooler.us-east-1.postgres.vercel-storage.com',
    password: 'bShkU0F6KMZl',
    user: 'default',
    port: 5432,
    ssl: true,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;
