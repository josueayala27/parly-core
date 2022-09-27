import express from 'express';
import { showMeeting, storeMeeting } from '../controllers/meeting.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/', auth, storeMeeting);
router.get('/:id', auth, showMeeting);

export default router;
