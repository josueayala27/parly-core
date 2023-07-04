import { Request, Response, NextFunction } from 'express';
import { getUserByGoogleToken } from '../services/personal_access_token.service';
import { retrieveAuthProviderByName } from '../services/auth_provider';
import { handleAuth } from '../services/auth.service';

interface Body {
  token: string;
}

interface _Request<T> extends Request {
  body: T;
}

export const authWithGoogle = async (
  { body }: _Request<Body>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByGoogleToken(body.token);
    const { id: providerId, provider } = await retrieveAuthProviderByName(
      'Google'
    );

    const token = await handleAuth(
      {
        avatar: user.picture,
        email: user.email,
        full_name: user.name,
        username: user.email,
        email_confirmed_at: user.email_verified ? new Date() : null,
        raw_meta_data: user,
      },
      providerId
    );

    res.json({ provider, token });
  } catch (error) {
    next(error);
  }
};

export const simpleAuth = {};
