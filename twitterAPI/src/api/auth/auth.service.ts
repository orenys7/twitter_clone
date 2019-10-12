import Joi from 'joi';
import User from '../../models/user.model';

export default {
    async  validateRegisterSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().min(4).required(),
            password: Joi.string().min(8).regex(new RegExp('[A-Z]+')).required(),
            image: Joi.string()
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
        return await User.findOne({ email: value.email })
    }
};