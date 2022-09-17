import express from 'express';
import helloRoute from './hello.route'

const router = express.Router();

const routes = [
  { path: '/hello', route: helloRoute },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;