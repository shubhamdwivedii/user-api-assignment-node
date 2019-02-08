//package requirements 

const Joi = require("joi");
const _ = require('lodash'); // like underscore library 
const bcrypt = require('bcryptjs'); //for hashing password 

// const jwt = require('jsonwebtoken');
// const config = require('config');

//User model and validateUser()
const { User } = require('../models/user');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    // validate the request body 
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //find if User is not already registered 
    let user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send("User not found"); //Invalid email or password."); 
    //if user is null/undefined then is doesn't exists in db, thus invalid login   //dont send 404 if user not found. 

    
    //comparing password to hashed password 
    const validPassword = await bcrypt.compare(req.body.password, user.password); //return promise
    //takes salt from user.password and uses it with hashed req.body.password to compare

    if(!validPassword) return res.status(400).send("Password issue");//Invalid email or password."); 

    //at this point the login request is valid.

    const token = user.generateAuthToken();//jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    //jwt.sign( payload, privatekey )

        // token decoded --> {
        // "_id": _id of user , 
        // "iat": time token was created // eg-> 1549466054
        // }


    res.send(token);  

});
  
function validate(req){
    const schema = {
        email: Joi.string().min(7).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()        
    };
    return Joi.validate(req,schema);
}

module.exports = router; 