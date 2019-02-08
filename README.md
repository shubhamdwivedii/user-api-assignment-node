
API-Reference:

 /api/login --> POST --> login request with email and password 
 /api/users --> GET  --> list all useres request 
                POST --> Create user (Sign-up new user) request with name, email and password 
 /api/notes --> GET  --> list all notes created by all users 
                POST --> Create new note request with title and text



Packages used: Express, Mongoose, Joi , bcryptjs , lodash , jsonwebtoken , config and morgan 
(see package.json for any other dependencies )

To install all dependencies first run command: 
> npm i 

If any package gives any error during install: 
> npm cache verify 
