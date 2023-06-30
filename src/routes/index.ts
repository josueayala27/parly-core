import express from 'express';

const router = express.Router();

router.use(
  '/test',
  router.get('/', (_, res) => {
    res.send('¡Hola, Express con TypeScript!');
  })
);

export default router;
