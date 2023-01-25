import { Router } from 'express';
import usersRouter from './routers/users';

const router = Router();

router.use('/users',usersRouter);

export default router;