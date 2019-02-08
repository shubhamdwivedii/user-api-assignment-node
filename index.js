//packgae imports 
const config = require("config");
// const cors = require('cors');
const morgan = require('morgan');

const cors = require('./middleware/cors');
const users = require('./routes/users'); //user-router
const login = require('./routes/login'); //logins-router
const notes = require('./routes/notes'); //notes-router


//Initialiing mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userapp',{ useNewUrlParser: true }) //database name is userapp by default change here if there are any conflicts 
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

//confiquration settings 

//console.log(config.get('jwtPrivateKey'));
if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1); //exit node process  
}

const express = require('express');
const app = express();


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors);


//API-routing 

app.use('/api/users', users); 
app.use('/api/login', login);
app.use('/api/notes', notes);



const port = process.env.PORT || 5000; //change the urlEndpoint in react app as well ( by default port is 5000)

app.listen(port, () => console.log(`Listening on port ${port}....`));