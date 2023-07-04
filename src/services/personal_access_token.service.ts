import axios, { HttpStatusCode } from 'axios';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError';
import db from '../config/database';

export const getUserByGoogleToken = async (token: string) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${token}"`
    );
    return data;
  } catch (error) {
    throw createError(httpStatus.NOT_FOUND, 'Invalid Google Token.');
  }
};

export const generateToken = async (
  userId: number | undefined,
  authProviderId: number
) => {
  try {
    const token = jwt.sign({}, 'TOKEN_SECRET');
    db.insertInto('personal_access_tokens')
      .values({
        token,
        user_id: userId as number,
        auth_provider_id: authProviderId,
      })
      .execute();

    return token;
  } catch (error) {
    throw createError(HttpStatusCode.BadRequest, error);
  }
};
