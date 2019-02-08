//packgae-imports 

const { Note, validate } = require('../models/note');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/', auth, async (req,res)=>{ // add auth later 
    const notes = await Note.find() //sort by date-time later
    
    res.send(notes);
});

router.post('/', auth, async (req,res) => { //can be accessed only after login

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let note = new Note({ 
        title: req.body.title,
        text: req.body.text 
    });
    note = await note.save();
    
    res.send(note);

});

module.exports = router; 