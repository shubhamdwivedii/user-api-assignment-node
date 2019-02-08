//This file is just for experimenting with bcrypt 

//const bcrypt = require('bcrypt'); // for hashing passwords 
const bcrypt = require('bcryptjs');

async function run() {
    const salt = await bcrypt.genSalt(10);  // add salt before and after password for more sequiryt
    const hashed = await bcrypt.hash('pass123',salt);
    console.log(salt);
    console.log(hashed);
}

run();