import { NextFunction, Request, Response } from 'express';
import {
  destroyLikeFromMessage,
  retrieveLastMessages,
  retrieveMessagesByChannel,
  storeMessage,
  storeMessageLikes,
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

export const addMessageLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await storeMessageLikes(
      req.user?.user_id as any,
      req.params.message as any
    );

    res.json({ message: 'The like was added.' });
  } catch (error) {
    next(error);
  }
};

export const deleteMessageLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await destroyLikeFromMessage(req.params.like as any);

    res.json({ message: 'The like was deleted.' });
  } catch (error) {
    next(error);
  }
};
