import User from '../models/user.model';
import Identity from '../models/identity.model';
import { generateToken } from './token.service';

export const createIdentity = async (userId, provider) => {
  const token = await generateToken(userId);
  await Identity.create({
    userId,
    identityProviderId: provider,
    token,
  });

  return token;
};

export const handleAuth = async (user, provider) => {
  const [{ id }] = await User.findOrCreate({
    where: { email: user.email },
    defaults: { ...user, rawAppMetaData: user },
  });

  return createIdentity(id, provider);
};

export const loginUser = () => null;
