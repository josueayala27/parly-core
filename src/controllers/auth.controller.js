import { handleAuth } from '../services/auth.service';
import { getUserByGoogleToken } from '../services/token.service';

export const authWithGoogle = async ({ body }, res, next) => {
  try {
    const { name, email, picture, email_verified } = await getUserByGoogleToken(
      body.token
    );

    const token = await handleAuth(
      {
        full_name: name,
        email,
        avatar: picture,
        email_confirmed_at: email_verified ? new Date() : null,
      },
      '30ff40c1-99df-424a-8fcc-36dc8d2e6942'
    );

    res.send({ auth_token: token, token_type: 'Bearer', provider: 'Google' });
  } catch (error) {
    next(error);
  }
};

export const authWithGithub = () => null;
