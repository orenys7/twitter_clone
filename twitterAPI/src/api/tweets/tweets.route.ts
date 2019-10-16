import { Router } from 'express';
import TweetController from './tweets.controller';
import { authenticate, authorize, verifyJwtToken } from '../auth/auth.middleware';
import passport = require('passport');

const router = Router();

router.get('', TweetController.getTweets);
router.post('', verifyJwtToken, TweetController.postTweet);
router.post(`/:id/star-toggle`, verifyJwtToken, TweetController.starToggle);
// router.post(`/:id/star-toggle`, verifyJwtToken, TweetController.unfavorite);
router.delete(`/:id`, verifyJwtToken, TweetController.deleteTweetById);

export default router;