import { FileMigrationProvider, Migrator } from 'kysely';
import { promises as fs } from 'fs';
import * as path from 'path';
import db from '../config/database';

const execute = async () => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach(({ migrationName, status }) => {
    if (status === 'Success') {
      console.log(`migration "${migrationName}" was executed successfully`);
    } else if (status === 'Error') {
      console.error(`failed to execute migration "${migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
};

execute();
