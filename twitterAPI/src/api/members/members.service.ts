import Joi, { func } from 'joi';
import User from '../../models/user.model';
import Tweet from '../../models/tweet.model';

export default {
    async  validateIdSchema(body: any) {
        const schema = Joi.object().keys({
            _id: Joi.string().min(24).required(),
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    async getProfileById (id: string) {
        const matched = User.findById(id);
        return matched;
    },

    async getUserTweets (authorID: string) {
        const matched = Tweet.find({'authorID': authorID});
        return matched;
    }
}