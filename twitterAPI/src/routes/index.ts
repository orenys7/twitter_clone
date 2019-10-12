import { Router } from 'express';
import { restRouter } from '../api/index';

const router = Router();

router.use('/api', restRouter);

export default router;