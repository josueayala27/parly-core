import express from 'express';
import { getUser } from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/me', auth, getUser);

export default router;
