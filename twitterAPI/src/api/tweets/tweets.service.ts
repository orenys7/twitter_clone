import Joi from 'joi';
import Tweet from '../../models/tweet.model';

export default {
    async validateTweetSchema (body: any) {
        const schema = Joi.object().keys({
            _id: Joi.string().min(24).required()
        });
        const { error, value } = Joi.validate(body, schema);
        if(error && error.details){
            return { error };
        }
        return { value };
    },

    async validatePostTweetSchema (body: any) {
        const schema = Joi.object().keys({
            authorID: Joi.string().min(24).required(),
            author: Joi.string().required(),
            authorAvatarUrl: Joi.string(),
            content: Joi.string().max(280).required(),
            createdAt: Joi.string(),
            startCounter: Joi.number(),
            starsUsers: Joi.array()
        });
        const { error, value } = Joi.validate(body, schema);
        if(error && error.details){
            return { error };
        }
        return { value };
    },

    async validateTweetIDSchema (body: any) {
        const schema = Joi.object().keys({
            _id: Joi.string().min(24).required(),
        });
        const { error, value } = Joi.validate(body, schema);
        if(error && error.details){
            return { error };
        }
        return { value };
    },

    async getAllTweets () {
        return await Tweet.find();
    }

}