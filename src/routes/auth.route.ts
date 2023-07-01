import express, { Router } from 'express';
import { authWithGoogle } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/google', authWithGoogle);

export default router;
