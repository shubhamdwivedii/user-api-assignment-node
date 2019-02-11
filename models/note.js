//package-imports 
const Joi = require('joi');

const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    text:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    likes:{
        type:[String] //[mongoose.SchemaTypes.ObjectId],
        //ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        default: "bg-light"
    }
    
    //add user relationships later 
});


getRandomColor = () =>{
    const colors = [
        "text-white bg-primary",
        "text-white bg-secondary",
        "text-white bg-success",
        "text-white bg-danger",
        "bg-warning",
        "text-white bg-info",
        "text-white bg-dark",
        "bg-light"
    ]
    return colors[Math.floor(Math.random() * colors.length)];  
}



const Note = mongoose.model('Note',noteSchema);

function validateNote(note){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        text: Joi.string().min(5).max(500).required()
    };
    return Joi.validate(note,schema);
}

function validateUpdate(note){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        text: Joi.string().min(5).max(500).required(),
        _id: Joi.string().required()
    };
    return Joi.validate(note,schema);
}


function validateLike(note){
    const schema = {
        _id: Joi.string().required(),
    };
    return Joi.validate(note,schema);
}



module.exports.Note = Note;
module.exports.validate = validateNote;
module.exports.validateLike = validateLike;
module.exports.validateUpdate =  validateUpdate;
module.exports.noteSchema = noteSchema;
module.exports.getRandomColor = getRandomColor;