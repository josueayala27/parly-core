import User from '../models/user.model';
import Identity from '../models/identity.model';
import { generateToken } from './token.service';

export const createIdentity = async (userId, provider) => {
  const token = await generateToken(userId);
  await Identity.create({
    user_id: userId,
    identity_provider_id: provider,
    token,
  });
  return token;
};

export const handleAuth = async (user, provider) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) return createIdentity(existingUser.id, provider);

  const { id } = await User.create({ ...user, raw_app_meta_data: user });
  return createIdentity(id, provider);
};

export const loginUser = () => null;
