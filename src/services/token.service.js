import jwt from 'jsonwebtoken';
import { get } from 'axios';
import httpStatus from 'http-status';
import Identity from '../models/identity.model';
import User from '../models/user.model';
import createError from '../utils/createError';

export const getUserByGoogleToken = async (token) => {
  const { data } = await get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${token}"`
  );
  return data;
};

export const generateToken = async (sub) => jwt.sign({ sub }, 'TOKEN_SECRET');

export const validateToken = async (token) => {
  const user = await Identity.findOne({ where: { token }, include: User });

  if (!user) {
    throw createError(httpStatus.NOT_FOUND, 'Invalid authorization token.');
  }

  return user;
};
