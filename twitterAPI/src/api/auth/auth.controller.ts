import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED,
    OK,
    CONFLICT
} from 'http-status-codes';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authService from './auth.service';
import User from '../../models/user.model';
import { devConfig } from '../../config/env/dev';

export default {
    async register (req: Request, res: Response) {
        try{
            const { error, value } = await authService.validateRegisterSchema(req.body.user);
            if(error && error.details){
                console.log(error);
                return res.status(BAD_REQUEST);
            }
            const existedUser = User.findOne(value.username);
            if(existedUser) return res.status(CONFLICT);
            const user = await User.create(value);
            const token = jwt.sign({ user: user }, devConfig.secret, {expiresIn: '1d' });
            return res.status(201).json({ success: true, token, user });
        }
        catch(err){
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },
    async login (req: Request, res: Response) {
        try{
            const { error, value } = await authService.validateLoginSchema(req.body.user);
            const user = await authService.findByEmail(value);
            if(!user){
                return res.status(BAD_REQUEST).json({ err: 'Invalid email or password' });
            }
            await user.setPassword(user.password);
            const matched = await user.validPassword(value.password);
            if(!matched){
                return res.status(UNAUTHORIZED).json({ err: 'Invalid credentials' });
            }
            const token = jwt.sign({ user: user }, devConfig.secret, {expiresIn: '1d' });
            return res.status(OK).json({success: true, token, user });
        }
        catch(err){
            console.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    }
};
