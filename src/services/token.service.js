import jwt from 'jsonwebtoken';
import axios from 'axios';

export const getUserByGoogleToken = async (token) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${token}"`
  );
  return data;
};

export const getUserByGithubToken = () => 'GitHub user token authentication';

export const generateToken = async (sub) => jwt.sign({ sub }, 'TOKEN_SECRET');
