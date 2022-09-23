import httpStatus from 'http-status';
import User from '../models/user.model';
import Identity from '../models/identity.model';
import CreateError from '../utils/createError';
import { generateToken } from './token.service';

export const createIdentity = async (userId, provider) => {
  const token = await generateToken(userId);
  console.log(token);
  await Identity.create({
    user_id: userId,
    identity_provider_id: provider,
    token,
  });
  return token;
};

export const registerUser = async (user, provider) => {
  if (await User.findOne({ email: user.email })) {
    throw new CreateError(
      httpStatus.BAD_REQUEST,
      'The email with which you want to register is already registered.'
    );
  }

  const { id } = await User.create({ ...user, raw_app_meta_data: user });
  return createIdentity(id, provider);
};

export const loginUser = () => null;
