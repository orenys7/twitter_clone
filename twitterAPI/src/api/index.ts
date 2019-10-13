import { Router } from 'express';
import authRouter from './auth/auth.route';
import tweetRouter from './tweets/tweets.route';
import membersRouter from './members/members.route';

export const restRouter = Router();

restRouter.use('/auth', authRouter);
restRouter.use('/tweets', tweetRouter);
restRouter.use('/members', membersRouter);
// restRouter.use('/login', invoiceRouter);
