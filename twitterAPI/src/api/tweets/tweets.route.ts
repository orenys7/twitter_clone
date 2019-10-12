import { Router } from 'express';
import TweetController from './tweets.controller';

const router = Router();

router.get('', TweetController.getTweets);
router.post('', TweetController.postTweet);
// router.post(`/${tweetId}/star-toggle`, TweetController.starToggle);
router.delete(`/:id`, TweetController.deleteTweetById);

export default router;