import express from 'express';
import { authWithGoogle, authWithGithub } from '../controllers/auth.controller';

const router = express.Router();

router.post('/google', authWithGoogle);
router.post('/github', authWithGithub);

export default router;
