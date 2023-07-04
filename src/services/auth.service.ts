import db from '../config/database';
import { NewUser } from '../models/user.model';
import { generateToken } from './personal_access_token.service';

export const handleAuth = async (payload: NewUser, authProvider: number) => {
  /**
   * Verify if the user exists.
   */
  const user = await db
    .selectFrom('users')
    .select('id')
    .where('email', '=', payload.email)
    .executeTakeFirst();

  /**
   * If the user isn't undefined or null generate a new Token.
   */
  if (user !== undefined && user != null) {
    const token = await generateToken(user.id, authProvider);
    return token;
  }

  /**
   * If the user isn't registered create a new user.
   */
  const newUser = await db
    .insertInto('users')
    .values(payload)
    .returningAll()
    .executeTakeFirst();

  const token = await generateToken(newUser?.id, authProvider);
  return token;
};

export const authWithGithub = {};
