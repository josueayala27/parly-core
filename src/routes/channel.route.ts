import express, { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import {
  createChannel,
  getChannelInformation,
  getChannels,
  getUsersByChannel,
} from '../controllers/channel.controller';
import { getMessages, sendMessage } from '../controllers/message.controller';

const router: Router = express.Router();

router.get('/', auth, getChannels);
router.post('/', auth, createChannel);
router.get('/:channel', auth, getChannelInformation);
router.get('/:channel/users', auth, getUsersByChannel);
router.post('/:channel/messages', auth, sendMessage);
router.get('/:channel/messages', auth, getMessages);

export default router;
