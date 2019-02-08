//package requirements
const Joi = require('joi');

const jwt = require('jsonwebtoken');
const config = require('config');

const mongoose = require('mongoose');


//User Schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        minlength: 7,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.get('jwtPrivateKey'));
    return token; 
}

//User Model 
const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(7).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()        
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;