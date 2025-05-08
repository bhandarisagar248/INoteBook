const express=require('express');
const router=express.Router();
const fetchuser=require('./middleware/fetchuser');
const Notes=require('../models/Notes');
const session = require('express-session');

const {body,validationResult}=require('express-validator');



//to retrieve all notes of the specific user after validation
router.post('/getnotes',fetchuser,async (req,res)=>{

    const notes=await Notes.find({user:req.user.id});
    res.json({notes});


})


//Router 2 to add notes 
router.post('/addnotes',fetchuser,
    
    [


        body('title','Title is necessary').exists(),
        body('description','Description is necessary').exists(),
        body('title','Title minimum length should be 5').isLength({min:5}),
        body('description','Description minimum length should be 10').isLength({min:10})
    ]
    
    
    , async (req,res)=>{


        
        try{
            const {title,description,tag}=req.body;

            const errors = validationResult(req);
            if(errors.isEmpty()){
                
                
                
                
                const note= new Notes({
                    
                    title,description,tag,user:req.user.id
                });
                
                const savednote= await note.save();
                
                if(savednote){
                    
                    return res.status(200).json({savednote});
                }
                else{

                    res.status(400).json({error:"Unable to save Note!!"});
                }
                
            }

        }
                
catch(err){
    console.log("Error Occured to find the items");
    return res.json({error:err});
};


}




);


//router 3 to update the existing notes of the user
router.put('/update',fetchuser,async (req,res)=>{

//destructuring to get the notes details from the request object
const {id,title,tag,description}=req.body;
console.log(id);
console.log(title);
console.log(tag);
console.log(description);

try{

    
    const newNote={};
    
    if(title){
        newNote.title=title;
        
    }
    if(description){
        
        newNote.description=description;
    }
    if(tag){
        
        newNote.tag=tag;
    }
    if(id){
        newNote._id=id;
    }
    
    console.log(req.user.id);

    //to find the note to update
    // var note= await Notes.findById("6807b17bf970cea87ab4a9dc");
    var note= await Notes.findById(id);
    console.log(note);
    if(!note){
        return res.status(404).send("Not Found");
        
    }
    // if(note.user.toString()!==req.params.id){
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized access");
        }
        
        note=await Notes.findByIdAndUpdate(id,{$set:newNote},{new:true});
        // note=await Notes.findByIdAndUpdate('6807b17bf970cea87ab4a9dc',{$set:newNote},{new:true});
        // note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        
        res.json({note});
        
    }
    catch(error){

        res.status(500).send("Internal Server Error");
    }


});




//to delete existing  note using delete ::login require

router.delete('/delete',fetchuser, async (req,res)=>{
const {_id}=req.body;

    try{
        let note=await Notes.findById(`${_id}`);
        if(!note){
            
            return res.status(404).send('Not Found');
        }
        
        
        //allow only if user id match the user id
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Unauthorized Access");
        }
        
        note=await Notes.findByIdAndDelete(`${_id}`);
        
        res.json({ message: 'Success: Note Deleted', note });

    }

    catch(error){

        res.status(500).send("Internal Server Error");
    }








});


module.exports=router;