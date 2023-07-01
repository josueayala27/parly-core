import express from 'express';
import db from '../config/database';

const router = express.Router();

router.use(
  '/test',
  router.post('/', async (_, res) => {
    const result = await db
      .insertInto('users')
      .values({ full_name: 'Josué ayala' })
      .executeTakeFirst();

    console.log(result);
    res.send({ ...result });
  })
);

export default router;
