import express, { Router } from 'express';
import {
  addMessageLike,
  deleteMessageLike,
  getLastMessages,
} from '../controllers/message.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/', auth, getLastMessages);
router.post('/:message/likes', auth, addMessageLike);
router.delete('/:message/likes/:like', auth, deleteMessageLike);

export default router;
