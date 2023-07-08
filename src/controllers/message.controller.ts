import { NextFunction, Request, Response } from 'express';
import {
  retrieveLastMessages,
  retrieveMessagesByChannel,
  storeMessage,
} from '../services/message.service';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await storeMessage(
      req.user?.user_id as number,
      req.params.channel,
      req.body.content
    );
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await retrieveMessagesByChannel(req.params.channel);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getLastMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await retrieveLastMessages(req.user?.user_id as any);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
