import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('starred_messages')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('message_id', 'integer', (col) =>
      col.references('messages.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('starred_messages').execute();
}
