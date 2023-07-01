import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('full_name', 'varchar', (col) => col.notNull())
    .addColumn('username', 'varchar', (col) => col.notNull())
    .addColumn('avatar', 'varchar')
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('bio', 'varchar')
    .addColumn('email_confirmed_at', 'timestamp')
    .addColumn('raw_meta_data', 'jsonb')
    .addColumn('user_gender_id', 'integer', (col) =>
      col.references('user_genders.id').onDelete('cascade')
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
}
