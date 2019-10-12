import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


export interface ITweet extends mongoose.Document {
    authorID: string;
    author: string;
    authorAvatarUrl: string;
    content: string;
    createdAt: string;
    startCounter: number;
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
    startCounter: {
        type: Number,

    },
    starsUsers: [{
        username: String
    }],
}, { timestamps: true });

TweetSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export default mongoose.model<ITweet>('Tweet', TweetSchema);
