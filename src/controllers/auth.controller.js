import findAuthProvider from '../services/auth_provider.service';
import { handleAuth } from '../services/auth.service';
import { getUserByGoogleToken } from '../services/token.service';

export const authWithGoogle = async ({ body }, res, next) => {
  try {
    const google = await getUserByGoogleToken(body.token);

    const { provider, id } = await findAuthProvider('Google');
    const token = await handleAuth(
      {
        full_name: google.name,
        email: google.email,
        avatar: google.picture,
        email_confirmed_at: google.email_verified ? new Date() : null,
      },
      google,
      id
    );

    res.send({ auth_token: token, token_type: 'Bearer', provider });
  } catch (error) {
    next(error);
  }
};

export const authWithGithub = () => null;
