import { Request, Response, NextFunction } from 'express';
import { getUserByGoogleToken } from '../services/token.service';
import { retrieveAuthProviderByName } from '../services/auth_provider';

interface Body {
  token: string;
}

interface _Request extends Request {
  body: Body;
}

export const authWithGoogle = async (
  { body }: _Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserByGoogleToken(body.token);
    const { id, provider } = await retrieveAuthProviderByName('Google');

    res.json({ user, provider: { id, provider } });
  } catch (error) {
    next(error);
  }
};

export const simpleAuth = {};
