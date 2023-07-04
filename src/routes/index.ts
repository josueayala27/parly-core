import express, { Router } from 'express';

import authRoute from './auth.route';
import authProviderRouter from './auth-provider.route';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/auth-providers', authProviderRouter);

export default router;
