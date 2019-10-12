import { Router } from 'express';
import authRouter from './auth/auth.route';
import tweetRouter from './tweets/tweets.route';

export const restRouter = Router();

restRouter.use('/auth', authRouter);
restRouter.use('/tweets', tweetRouter);

// restRouter.use('/login', invoiceRouter);
// restRouter.use('/members', userRouter);
