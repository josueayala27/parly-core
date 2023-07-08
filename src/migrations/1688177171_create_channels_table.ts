import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('channels')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'varchar')
    .addColumn('image', 'varchar')
    .addColumn('invite_hash', 'varchar', (col) => col.notNull())
    .addColumn('users_can_edit', 'boolean')
    .addColumn('users_can_send_messages', 'boolean')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('channels').execute();
}
