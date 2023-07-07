import { HttpStatusCode } from 'axios';
import db from '../config/database';
import createError from '../utils/createError';

export const storeAuthProvider = async (provider: string) => {
  try {
    const authProvider = db
      .insertInto('auth_providers')
      .values({ provider })
      .returningAll()
      .executeTakeFirst();

    return authProvider;
  } catch (error) {
    throw createError(HttpStatusCode.BadRequest, error);
  }
};

export const retrieveAuthProviders = async () => {
  const providers = await db
    .selectFrom('auth_providers')
    .select(['id', 'provider'])
    .execute();
  if (providers) return providers;

  throw createError(HttpStatusCode.NoContent, 'No records found.');
};

export const retrieveAuthProviderByName = async (provider: string) => {
  const authProvider = await db
    .selectFrom('auth_providers')
    .select(['id', 'provider'])
    .where('provider', '=', provider)
    .executeTakeFirst();
  if (authProvider) return authProvider;

  throw createError(HttpStatusCode.NoContent, 'No record found.');
};
