import { Router } from 'express';
import MembersController from './members.controller';

const router = Router();

router.get('/:id', MembersController.getProfileById);
router.get('/:id/tweets', MembersController.getUserTweets);
// router.post('', MembersController.postTweet);
// router.post(`/${tweetId}/star-toggle`, TweetController.starToggle);
// router.delete(`/:id`, MembersController.deleteTweetById);

export default router;