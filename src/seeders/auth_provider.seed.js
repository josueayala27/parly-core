import chalk from 'chalk';
import AuthProvider from '../models/auth_provider.model';

const createAuthProviders = async (...providers) => {
  const mapProviders = providers.map((provider) => ({ provider }));
  const seed = await AuthProvider.bulkCreate(mapProviders);
  console.log(
    `${chalk.green('•')} Added ${seed.length} columns for auth_providers table.`
  );
};

// Seed Google, Github provider
createAuthProviders('Google', 'Github');
