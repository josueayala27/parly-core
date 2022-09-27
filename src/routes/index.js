import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import meetingRoute from './meeting.route';

const router = express.Router();

const routes = [
  { path: '/auth', route: authRoute },
  { path: '/user', route: userRoute },
  { path: '/meeting', route: meetingRoute },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
