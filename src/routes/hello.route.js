import express from 'express';
import { sayHello } from '../controllers/hello.controller';

const router = express.Router();

router.get('/', sayHello);

export default router;