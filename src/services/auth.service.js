import User from '../models/user.model';
import PersonalAccessToken from '../models/personal_access_token.model';
import { generateToken } from './token.service';

export const createPersonalAccessToken = async ({ user, provider }) => {
  const userToken = await generateToken(user);
  const { token } = await PersonalAccessToken.create({
    user_id: user,
    auth_provider_id: provider,
    token: userToken,
  });

  return token;
};

export const handleAuth = async (user, google, provider) => {
  const [{ id }] = await User.findOrCreate({
    where: { email: user.email },
    defaults: { ...user, raw_app_meta_data: google },
  });

  return createPersonalAccessToken({ user: id, provider });
};
