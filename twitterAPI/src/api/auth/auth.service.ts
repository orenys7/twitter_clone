import Joi from 'joi';
import User, { IUser } from '../../models/user.model';

export default {
    async  validateRegisterSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().min(4).required(),
            password: Joi.string().min(8).regex(new RegExp('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')).required(),
            image: Joi.string(),
            // createdAt: Joi.string(),
            // lastLogin: Joi.string()
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    async  validateLoginSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).regex(new RegExp('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')).required()
        });
        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    async findByEmail(value: any) {
        return await User.findOneAndUpdate({ email: value.email }, {'lastLogin': new Date().toLocaleDateString()});
    },

    async findDuplicated (value: IUser) {
        const byEmail = await User.findOne({'email': value.email}).exec();
        const byUsername = await User.findOne({'username': value.username}).exec();
        if(byEmail || byUsername) return true;
        return false;
    },

    async completeMissingDetails (value: IUser) {
        value.createdAt = new Date().toLocaleDateString();
        value.lastLogin = new Date().toLocaleDateString();
        return value;
    },

    setUpdatedDate(user: IUser){
        user.lastLogin = new Date().toLocaleDateString();
    }
};