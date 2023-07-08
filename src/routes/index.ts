import express, { Router } from 'express';

import authRoute from './auth.route';
import authProviderRouter from './auth-provider.route';
import userRouter from './user.route';
import channelRouter from './channel.route';
import messageRouter from './message.route';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/auth-providers', authProviderRouter);
router.use('/user', userRouter);
router.use('/channels', channelRouter);
router.use('/messages', messageRouter);

export default router;
