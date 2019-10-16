import Joi from 'joi';
import Tweet, { ITweet } from '../../models/tweet.model';

export default {
    async validateTweetSchema(body: any) {
        const schema = Joi.object().keys({
            _id: Joi.string().min(24).required(),
            authorID: Joi.string().min(24).required(),
            author: Joi.string().required(),
            authorAvatarUrl: Joi.string(),
            content: Joi.string().max(280).required(),
            createdAt: Joi.string(),
            starCounter: Joi.number(),
            starsUsers: Joi.array()
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    async validatePostTweetSchema(body: any) {
        const schema = Joi.object().keys({
            authorID: Joi.string().min(24).required(),
            author: Joi.string().required(),
            authorAvatarUrl: Joi.string(),
            content: Joi.string().max(280).required(),
            createdAt: Joi.string(),
            starCounter: Joi.number(),
            starsUsers: Joi.array()
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    async validateTweetIDSchema(body: any) {
        const schema = Joi.object().keys({
            _id: Joi.string().min(24).required(),
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    async getAllTweets() {
        return await Tweet.find();
    },

    async favorite(tweet: ITweet, userID: string) {
        tweet.starsUsers.push(userID);
        tweet.starCounter = tweet.starsUsers.length;
        tweet.save();
    },

    async unfavorite(tweet: ITweet, userID: string) {
        const userIndex = tweet.starsUsers.indexOf(userID);
        tweet.starsUsers.splice(userIndex, 1);
        tweet.starCounter = tweet.starsUsers.length;
        tweet.save();
    }

}