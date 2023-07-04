import express, { Router } from 'express';
import {
  createAuthProvider,
  findAllAuthProviders,
} from '../controllers/auth-provider.controller';

const router: Router = express.Router();

router.post('/', createAuthProvider);
router.get('/', findAllAuthProviders);

export default router;
