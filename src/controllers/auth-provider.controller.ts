import { Request, Response, NextFunction } from 'express';
import {
  retrieveAuthProviders,
  storeAuthProvider,
} from '../services/auth_provider';

export const createAuthProvider = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await storeAuthProvider(body.provider);
    res.json({ message });
  } catch (error) {
    next(error);
  }
};

export const findAllAuthProviders = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authProviders = await retrieveAuthProviders();
    res.json(authProviders);
  } catch (error) {
    next(error);
  }
};

export const simpleAuth = {};
