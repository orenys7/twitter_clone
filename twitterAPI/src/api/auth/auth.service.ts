import Joi from 'joi';

export default {
    async  validateSchema (body: any, type?:string) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).regex(new RegExp('[A-Z]+')).required()
        });
        if(type === 'register'){
            schema.keys({
                username: Joi.string().min(4).required(),
            });
        }
        const { error, value } = Joi.validate(body, schema);
        if(error && error.details){
            return { error };
        }
        return { value };
    },
};