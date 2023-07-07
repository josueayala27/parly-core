import httpStatus from 'http-status';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import db from '../config/database';
import createError from '../utils/createError';

export const retrieveUserByToken = async (token: string) => {
  const user = await db
    .selectFrom('personal_access_tokens')
    .selectAll()
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('users as user')
          .selectAll()
          .whereRef('user.id', '=', 'personal_access_tokens.user_id')
      ).as('user')
    )
    .where('personal_access_tokens.token', '=', token)
    .executeTakeFirst();

  if (!user) {
    throw createError(httpStatus.NOT_FOUND, 'Invalid authorization token.');
  }

  return user;
};
