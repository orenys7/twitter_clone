import Joi from 'joi';
import User, { IUser } from '../../models/user.model';

export default {
    async  validateRegisterSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().min(4).required(),
            password: Joi.string().min(8).regex(new RegExp('[A-Z]+')).required(),
            image: Joi.string(),
            createdAt: Joi.string(),
            lastLogin: Joi.string()
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
            password: Joi.string().min(8).regex(new RegExp('[A-Z]+')).required()
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
        const byUsername = await User.findOne({'username': value.username}).exec();
        const byEmail = await User.findOne({'email': value.email}).exec();
        if(byEmail || byUsername) return true;
        return false;
    }
};