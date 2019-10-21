import { Router } from 'express';
import TweetController from './tweets.controller';
import { verifyJwtToken } from '../auth/auth.middleware';

const router = Router();

router.get('', TweetController.getTweets);
router.post('', verifyJwtToken, TweetController.postTweet);
router.post(`/:id/star-toggle`, verifyJwtToken, TweetController.starToggle);
router.delete(`/:id`, verifyJwtToken, TweetController.deleteTweetById);

export default router;