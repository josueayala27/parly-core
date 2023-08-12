import { NextFunction, Request, Response } from 'express';
import {
  retrieveChannelInfo,
  retrieveChannelUsersById,
  storeChannel,
} from '../services/channel.service';

export const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await storeChannel(
      req.user?.user_id as number,
      req.body.users
    );

    res.json({ message });
  } catch (error) {
    next(error);
  }
};

export const getUsersByChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await retrieveChannelUsersById(req.params.channel);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getChannelInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await retrieveChannelInfo(Number(req.params.channel));
    res.json(response);
  } catch (error) {
    next(error);
  }
};
