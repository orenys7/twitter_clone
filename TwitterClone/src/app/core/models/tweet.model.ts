import { IProfile } from './profile.model';

export interface ITweet{
    _id: string,
    authorID: string
    author: string,
    authorAvatarUrl: string,
    content: string,
    createdAt: string,
    startCounter: number,
    starsUsers: string[]
}

export interface IPost{
    authorID: string
    author: string,
    authorAvatarUrl: string,
    content: string,
    createdAt: string,
    startCounter: number,
    starsUsers: string[]
}