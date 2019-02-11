//packgae-imports 

const { Note, validate ,validateLike ,validateUpdate ,getRandomColor } = require('../models/note');
const auth = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/', auth, async (req,res)=>{ // add auth later 
    const notes = await Note
        .find() //sort by date-time later
        .sort({date:-1}) //sorts by decreasing order ( most recent first)
        .populate('author','name');

    res.send(notes);
});

router.post('/', auth, async (req,res) => { //can be accessed only after login

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log(req.user);
    let note = new Note({ 
        title: req.body.title,
        text: req.body.text ,
        author: req.user._id,  //added by auth middleware 
        color: getRandomColor(),
        likes: []
    });

    note = await note.save();
    
    res.send(note);

});

router.put('/note', auth, async (req,res) => {
    console.log(req.body);
    let note = await Note.findById(req.body._id);
    if(!note) return res.status(404).send("Note not found.");

    const { error } = validateUpdate(req.body); //validate if req has title and text 
    if(error) return res.status(400).send(error.details[0].message);

    if(note.author != req.user._id) return res.status(400).send("User not authorized to update this note.");

    note.title = req.body.title;
    note.text = req.body.text;
    const result = await note.save();

    res.send(result);

});

router.delete('/note',auth, async(req,res)=>{
    console.log(req.body._id);
    let note = await Note.findById(req.body._id);
    if(!note) return res.status(404).send("Note not found.");

    
    if(note.author != req.user._id) return res.status(400).send("User not authorized to delete this note.");

    const result = await Note.findByIdAndRemove(req.body._id);

    res.send(result);

});


router.patch('/', auth , async (req,res) => { //likes implemented as patch request for now

    const { error } = validateLike(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let note = await Note.findById(req.body._id);
    if(!note) return res.status(404).send("Note not found.");

    //console.log((note.likes.includes(req.user.name)));
    const index = note.likes.indexOf(req.user.name);
    if( index === -1 )
        note.likes.push(req.user.name);
    else
        note.likes.splice(index, 1);
    
    result = await note.save();

    res.send(note.likes);
    //res.send(note);
});

module.exports = router; 