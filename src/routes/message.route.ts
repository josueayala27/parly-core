import express, { Router } from 'express';
import { getLastMessages } from '../controllers/message.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/', auth, getLastMessages);

export default router;
