import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('attachments')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('filename', 'varchar', (col) => col.notNull())
    .addColumn('raw_meta_data', 'jsonb')
    .addColumn('size', 'integer')
    .addColumn('message_id', 'integer', (col) =>
      col.references('messages.id').onDelete('cascade').notNull()
    )
    .addColumn('attachment_type_id', 'integer', (col) =>
      col.references('attachment_types.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user_channel_settings').execute();
}
