
import express from 'express';
import { init } from '../controllers/auth.controller';

const router = express.Router();

router.get('/', init);

export default router;
