import jwt from 'jsonwebtoken';
import { get } from 'axios';
import httpStatus from 'http-status';
import PersonalAccessToken from '../models/personal_access_token.model';
import User from '../models/user.model';
import createError from '../utils/createError';
import UserGender from '../models/user_gender.model';

export const getUserByGoogleToken = async (token) => {
  try {
    const { data } = await get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${token}"`
    );
    return data;
  } catch (error) {
    throw createError(httpStatus.NOT_FOUND, 'Invalid google token.');
  }
};

export const generateToken = async (sub) => jwt.sign({ sub }, 'TOKEN_SECRET');

export const validateToken = async (token) => {
  const user = await PersonalAccessToken.findOne({
    where: { token },
    include: [{ model: User, include: [UserGender] }],
  });

  if (!user) {
    throw createError(httpStatus.NOT_FOUND, 'Invalid authorization token.');
  }

  return user;
};
