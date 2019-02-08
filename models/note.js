//package-imports 
const Joi = require('joi');

const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 25
    },
    text:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    }
    //add user relationships later 
});


const Note = mongoose.model('Note',noteSchema);

function validateNote(note){
    const schema = {
        title: Joi.string().min(5).max(25).required(),
        text: Joi.string().min(5).max(250).required()
    };
    return Joi.validate(note,schema);
}


module.exports.Note = Note;
module.exports.validate = validateNote;
module.exports.noteSchema = noteSchema;
