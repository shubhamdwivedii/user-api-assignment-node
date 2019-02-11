//packages
const jwt = require('jsonwebtoken');
const config = require('config');


// Authorizaton 
function auth(req, res, next){
    
    const token = req.header('x-auth-token'); // reads token stored in request header 

    if(!token) return  res.status(401).send('Access denied. No token provided.');
    // 401 means unauthorized access 

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // jwt.verify return the payload { _id: user._id}
        
        req.user = decoded; 
        //adds user id in request body 
        
        //console.log("auth-jwt user: ", req.user);
        next();    
    }
    catch(ex){
        res.status(400).send('Invalid Token.');
        // 400 means bad request.
    }
}

module.exports = auth; 