import express, { Router } from 'express';
import { getMe } from '../controllers/user.controller';
import auth from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/me', auth, getMe);

export default router;
