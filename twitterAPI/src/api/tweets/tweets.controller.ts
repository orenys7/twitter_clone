import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    UNAUTHORIZED,
    OK,
    FORBIDDEN,
    NOT_FOUND,
    NO_CONTENT
} from 'http-status-codes';
import { Request, Response } from 'express';
import tweetsService from './tweets.service';
import Tweet from '../../models/tweet.model';
// import { devConfig } from '../../config/env/dev';

export default {
    async getTweets(req: Request, res: Response) {
        try {
            const tweets = await tweetsService.getAllTweets();
            return res.status(OK).json({ success: true, tweets });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async postTweet(req: Request, res: Response) {
        try {
            // if (!req.isAuthenticated()) return res.status(UNAUTHORIZED);
            const { error, value } = await tweetsService.validatePostTweetSchema(req.body.tweet);
            if (error && error.details) {
                console.log(error);
                return res.status(BAD_REQUEST);
            }
            const tweet = await Tweet.create(value);
            return res.status(201).json({ success: true, tweet });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async starToggle(req: Request, res: Response) {
        try {
            const { error, value } = await tweetsService.validateTweetSchema(req.body.tweet);
            if (error && error.details) {
                console.log(error);
                return res.status(BAD_REQUEST);
            }
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async deleteTweetById(req: Request, res: Response) {
        try {
            console.log(req.params.id);
            // if (!req.isAuthenticated()) {
            //     console.log('not authenticated');
            //     return res.status(UNAUTHORIZED);
            // }
            const tweetToDelete = {
                _id: req.params.id
            };
            const { error, value } = await tweetsService.validateTweetIDSchema(tweetToDelete);
            if (error && error.details) {
                console.log(error);
                return res.status(BAD_REQUEST);
            }
            console.log(value);
            const tweet = await Tweet.findById(value);
            if (!tweet) {
                console.log('Not Found');
                return res.status(NOT_FOUND);
            }
            // if (value.authorID !== tweet.authorID) {
            //     console.log('Not the Owner');
            //     return res.status(FORBIDDEN);
            // }
            await Tweet.deleteOne({"_id": tweet._id });
            return res.status(NO_CONTENT).json({ success: true });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

}