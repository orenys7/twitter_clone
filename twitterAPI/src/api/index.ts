import { Router } from 'express';
import authRouter from './auth/auth.route';

export const restRouter = Router();
restRouter.use('/auth', authRouter);
// restRouter.use('/login', invoiceRouter);
// restRouter.use('/members', userRouter);
// restRouter.use('/tweets', userRouter);