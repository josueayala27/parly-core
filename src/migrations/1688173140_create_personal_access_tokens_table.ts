import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('personal_access_tokens')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('token', 'varchar', (col) => col.notNull())
    .addColumn('user_id', 'integer', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('auth_provider_id', 'integer', (col) =>
      col.references('auth_providers.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('personal_access_tokens').execute();
}
