import { Router } from 'express';
import TweetController from './tweets.controller';
import { authenticate, authorize } from '../auth/auth.middleware';
import passport = require('passport');

const router = Router();

router.get('', TweetController.getTweets);
router.post('', TweetController.postTweet);
router.post(`/:id/star-toggle`, TweetController.starToggle);
router.delete(`/:id/star-toggle`, TweetController.starToggle);
router.delete(`/:id`, TweetController.deleteTweetById);

export default router;