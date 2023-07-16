import { Kysely, sql } from 'kysely';
import { Database } from '../models';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('likes')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('message_id', 'integer', (col) =>
      col.references('messages.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('likes').execute();
}
