import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED,
    OK
} from 'http-status-codes';
import { Request, Response } from 'express';
// import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authService from './auth.service';
import User from '../../models/user.model';
import { devConfig } from '../../config/env/dev';
// import passport from 'passport';

export default {
    async register (req: Request, res: Response) {
        try{
            const { error, value } = await authService.validateSchema(req.body, 'register');
            if(error && error.details){
                return res.status(BAD_REQUEST);
            }
            // needs another if with duplicated user details -> return 409 status code
            const user = await User.create(value);
            return res.status(201).json({ success: true, message: value });
        }
        catch(err){
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },
    async login (req: Request, res: Response) {
        try{
            const { error, value } = await authService.validateSchema(req.body);
            const user = await User.findOne({ email: value.email });
            if(!user){
                return res.status(BAD_REQUEST).json({ err: 'Invalid email or password' });
            }
            const matched = await user.validPassword(value.password); //await bcryptjs.compare(value.password, user.password);
            if(!matched){
                return res.status(UNAUTHORIZED).json({ err: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, devConfig.secret, {expiresIn: '1d' });
            return res.status(OK).json({success: true, token });
        }
        catch(err){
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    }
};
