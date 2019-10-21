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
import jwt from 'jsonwebtoken';
import { KnownConfigKey } from '../../config/config';

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
            jwt.verify(req.query.token, KnownConfigKey.secret, async (err: Error, authData: any) => {
                if (err) {
                    return res.status(UNAUTHORIZED).json(err);
                }
                else {
                    if (authData.user._id !== req.body.tweet.authorID) {
                        return res.status(UNAUTHORIZED).json('Not Authorized');
                    }
                    const { error, value } = await tweetsService.validatePostTweetSchema(req.body.tweet);
                    if (error && error.details) {
                        console.log(error);
                        return res.status(BAD_REQUEST).json(error);
                    }
                    const tweet = await Tweet.create(value);
                    return res.status(201).json({ success: true, tweet });
                }
            });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async starToggle(req: Request, res: Response) {
        try {
            jwt.verify(req.query.token, KnownConfigKey.secret, async (err: Error, authData: any) => {
                if (err) {
                    return res.status(UNAUTHORIZED).json(err);
                }
                else {
                    const tweetToStar = {
                        _id: req.params.id
                    };
                    const userID: string = authData.user._id;
                    const { error, value } = await tweetsService.validateTweetIDSchema(tweetToStar);
                    if (error && error.details) {
                        console.log(error);
                        return res.status(BAD_REQUEST).json(error);
                    }
                    const tweet = await Tweet.findById(tweetToStar._id);
                    if (!tweet) {
                        return res.status(NOT_FOUND).json('Not Found');
                    }
                    const userIndex = tweet.starsUsers.indexOf(userID);
                    if(userIndex === -1){
                        await tweetsService.favorite(tweet, userID);
                    }
                    else {
                        await tweetsService.unfavorite(tweet, userID);
                    }
                    return res.status(OK).json(tweet.starsUsers);
                }
            });

        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async deleteTweetById(req: Request, res: Response) {
        try {
            jwt.verify(req.query.token, KnownConfigKey.secret, async (err: Error, authData: any) => {
                if (err) {
                    return res.status(UNAUTHORIZED).json(err);
                }
                else {
                    const tweetToDelete = {
                        _id: req.params.id
                    };
                    const { error, value } = await tweetsService.validateTweetIDSchema(tweetToDelete);
                    if (error && error.details) {
                        console.log(error);
                        return res.status(BAD_REQUEST).json(error);
                    }
                    const tweet = await Tweet.findById(value);
                    if (!tweet) {
                        return res.status(NOT_FOUND).json('Not Found');
                    }
                    if (authData.user._id !== tweet.authorID) {
                        return res.status(FORBIDDEN).json('Not the Owner');
                    }
                    await Tweet.deleteOne({ "_id": tweet._id });
                    return res.status(NO_CONTENT).json({ success: true });
                }
            });
        }
        catch (err) {
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

}