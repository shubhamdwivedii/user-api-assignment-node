//package requirements 

const _ = require('lodash'); // like underscore library 
const bcrypt = require('bcryptjs'); //for hashing password 
const auth = require('../middleware/auth'); //authorization add user's _id in req.body if token is valid 
// const jwt = require('jsonwebtoken');
// const config = require("config");


//User model and validateUser()
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();


router.get('/user', auth, async (req,res) =>{
    const user = await User.findById(req.user._id).select('-password'); // forgot await --> json.stringify() can't convert circular json object ?????
    res.send(user);
})

router.post('/', async (req,res) => {
    // validate the request body 
    const { error } = validate(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    
    //find if User is not already registered 
    let user = await User.findOne({ email: req.body.email })
    if(user) return res.status(400).send("Email already registered.");
    // if user is not null/undefined then it exists already in db...
    

    //else save new user in db 
    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body,['name', 'email', 'password']));   
    
    //hashing password 
    const salt = await bcrypt.genSalt(10);  // add salt before and after password for more sequiryt
    user.password = await bcrypt.hash(user.password,salt);
    
    await user.save();

    //return new user in response 
    
    // res.send({ // to avoid sending password also 
    //     name: user.name,
    //     email: user.email 
    // });
    //res.send(_.pick(user, ['_id','name','email']));

    const token = user.generateAuthToken();//jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token") // allows front-end user to read above header 
        .send(_.pick(user, ['_id','name','email'])); 

});
  
module.exports = router; 