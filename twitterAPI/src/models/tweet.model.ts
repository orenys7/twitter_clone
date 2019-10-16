import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface ITweet extends mongoose.Document {
    authorID: string;
    author: string;
    authorAvatarUrl: string;
    content: string;
    createdAt: string;
    starCounter: number;
    starsUsers: string[];
}

const TweetSchema = new mongoose.Schema({
    authorID: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorAvatarUrl: String,
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,

    },
    starCounter: {
        type: Number,

    },
    starsUsers: {
        type: [],
    },
}, { timestamps: true });

TweetSchema.plugin(uniqueValidator, { message: 'is already taken.' });

TweetSchema.statics.findByAuthorID = function(authorID: string, cb: any) {
    return this.find({ name: new RegExp(authorID, 'i') }, cb);
}

export default mongoose.model<ITweet>('Tweet', TweetSchema);
