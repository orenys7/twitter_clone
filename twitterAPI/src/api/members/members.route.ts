import { Router } from 'express';
import MembersController from './members.controller';

const router = Router();

router.get('/:id', MembersController.getProfileById);
router.get('/:id/tweets', MembersController.getUserTweets);

export default router;