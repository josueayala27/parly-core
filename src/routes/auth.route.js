import express from 'express';
import { authWithGoogle } from '../controllers/auth.controller';

const router = express.Router();

router.post('/google', authWithGoogle);

export default router;
