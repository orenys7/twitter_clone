import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED,
    OK,
    CONFLICT,
	NOT_FOUND
} from 'http-status-codes';
import { Request, Response } from 'express';
import membersService from './members.service';

export default {
	async getProfileById (req: Request, res: Response) {
		try {
			const profileId = {
                _id: req.params.id
			};
			const { error, value } = await membersService.validateIdSchema(profileId);
			if(!value) return res.status(BAD_REQUEST).json(error);
			const matched = await membersService.getProfileById(profileId._id);
			if(!matched) return res.status(NOT_FOUND).json('Not Found');
			matched.save();
			const profile = {
				_id: matched._id,
				username: matched.username,
				email: matched.email,
				image: matched.image,
				createdAt: matched.createdAt,
				lastLogin: matched.lastLogin
			}
            return res.status(OK).json({ success: true, profile });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
	},
	async getUserTweets (req: Request, res: Response) {
		try {
			const profileId = {
                _id: req.params.id
			};
			const { error, value } = await membersService.validateIdSchema(profileId);
			if(!value) return res.status(BAD_REQUEST).json(error);
			const tweets = await membersService.getUserTweets(req.params.id);
			if(!tweets) return res.status(NOT_FOUND).json('Not Found');
            return res.status(OK).json({ success: true, tweets });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
	}
}