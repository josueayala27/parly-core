import { NextFunction, Request, Response } from 'express';
import db from '../config/database';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await db
      .selectFrom('users')
      .select(['id', 'full_name', 'avatar', 'email', 'bio'])
      .where('id', '=', req.user?.user_id as any)
      .execute();
    res.json(user);
  } catch (error) {
    next(error);
  }
};
