import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import uniqueValidator from 'mongoose-unique-validator';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface IUser extends Document {
    username: String;
    email: String;
    validPassword: (password: string) => boolean;
    generateJWT: () => string;
    setPassword: (password: string) => void;  
    image: String;
    hash: String;
    salt: String;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    image: String,
    hash: String,
    salt: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.setPassword = function (password: string) {
    this.salt = CryptoJS.lib.WordArray.random(16);
    this.hash = CryptoJS.PBKDF2(password, this.salt, {
        keySize: 512 / 32, iterations: 1000
    });
}

UserSchema.methods.validPassword = function(password: string) {
    const hash = CryptoJS.PBKDF2(password, this.salt, {
      keySize: 512 / 32,
      iterations: 1000
    });
  
    return this.hash.toString() === hash.toString();
  };

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 30);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(`${exp.getTime() / 1000}`),
    }, config.secret);
}

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

export default mongoose.model('User', UserSchema);
