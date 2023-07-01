import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user_channel_settings')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('allow_notifications', 'boolean')
    .addColumn('channel_id', 'integer', (col) =>
      col.references('channels.id').onDelete('cascade').notNull()
    )
    .addColumn('user_id', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user_channel_settings').execute();
}
