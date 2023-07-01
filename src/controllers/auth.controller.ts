import { Request, Response, NextFunction } from 'express';

export const authWithGoogle = (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const googleToken = body.token;

    res.json({ googleToken });
  } catch (error) {
    next(error);
  }
};

export const simpleAuth = {};
