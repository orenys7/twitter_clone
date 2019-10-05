import { IProfile } from './profile.model';

export interface ITweet{
    id: String,
    author: String,
    content: String,
    createdAt: String,
    startCounter: Number,
    starsUsers: String[]
}