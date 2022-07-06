const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

class AuthServices {
    async logIn(data) {
        const { error } = validate(data);
        if (error) throw new Error(error.details[0].message);

        let user = await User.findOne({ email: data.email });
        
        if (!user) throw new Error('Invalid email.');

        const validPassword = await bcrypt.compare(data.password, user.password)
        if(!validPassword) throw new Error('Invalid password.');

        const token = user.generateAuthToken();
        return {
            token,
            user
        };
    }
}
    
    function  validate(data) {
        console.log(data)
        const schema = Joi.object({
            email: Joi.string().min(5).max(50).email().required(),
            password: Joi.string().min(5).max(255).required()
        });
        return schema.validate(data);
    }

module.exports = new AuthServices();
exports.validate = validate;