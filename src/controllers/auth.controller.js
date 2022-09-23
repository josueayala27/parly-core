import { registerUser } from '../services/auth.service';
import { getUserByGoogleToken, generateToken } from '../services/token.service';

export const authWithGoogle = async ({ body: { token } }, res, next) => {
  try {
    const userInformation = await getUserByGoogleToken(token);
    const registeredUser = await registerUser(userInformation);

    res.send({
      access_token: userInformation,
      token_type: 'Bearer',
      is_login: true,
    });
  } catch (error) {
    next(error);
  }
};

export const simpleAuth = () => null;
