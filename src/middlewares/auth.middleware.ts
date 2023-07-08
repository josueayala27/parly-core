import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import createError from '../utils/createError';
import { retrieveUserByToken } from '../services/user.service';

export const auth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const AUTH_HEADER = 'authorization';

    /**
     * Validate if authorization header is in the request.
     */
    if (!req.headers[AUTH_HEADER]) {
      next(
        createError(httpStatus.FORBIDDEN, 'Authentication header not found.')
      );
    }

    const authToken: string = req.headers[AUTH_HEADER]?.split(' ')[1] as string;

    const user = await retrieveUserByToken(authToken);

    req.user = user as any;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
