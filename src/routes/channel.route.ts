import express, { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import { createChannel, getChannel } from '../controllers/channel.controller';

const router: Router = express.Router();

router.post('/', auth, createChannel);
router.get('/:channel', auth, getChannel);

export default router;
