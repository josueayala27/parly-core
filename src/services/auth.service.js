import User from '../models/user.model';
import Identity from '../models/identity.model';
import { generateToken } from './token.service';

export const createIdentity = async ({ user, provider }) => {
  const userToken = await generateToken(user);
  const { token } = await Identity.create({
    user_id: user,
    identity_provider_id: provider,
    userToken,
  });

  return token;
};

export const handleAuth = async (user, provider) => {
  const [{ id }] = await User.findOrCreate({
    where: { email: user.email },
    defaults: { ...user, raw_app_meta_data: user },
  });

  return createIdentity({ user: id, provider });
};
