import express from 'express';
import { storeMeeting } from '../controllers/meeting.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, storeMeeting);

export default router;
