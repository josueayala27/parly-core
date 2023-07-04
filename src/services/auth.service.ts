import db from '../config/database';
import { UserTable } from '../models/user.model';
import { generateToken } from './token.service';

export const handleAuth = async (payload: UserTable, authProvider: number) => {
  const user = await db
    .selectFrom('users')
    .select('id')
    .where('email', '=', payload.email)
    .executeTakeFirst();

  if (user !== undefined && user != null) {
    const token = await generateToken(user.id, authProvider);
    return token;
  }

  return '';
};

export const authWithGithub = {};
