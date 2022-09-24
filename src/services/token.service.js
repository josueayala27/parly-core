import jwt from 'jsonwebtoken';
import { get } from 'axios';
import snakecaseKeys from 'snakecase-keys';
import Identity from '../models/identity.model';
import User from '../models/user.model';

export const getUserByGoogleToken = async (token) => {
  const { data } = await get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${token}"`
  );
  return data;
};

export const generateToken = async (sub) => jwt.sign({ sub }, 'TOKEN_SECRET');

export const validateToken = async (token) =>
  Identity.findOne({ where: { token }, include: User });
