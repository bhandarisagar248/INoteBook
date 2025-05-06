const express=require('express');
const router=express.Router();
const User =require("../models/User");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const fetchuser=require('./middleware/fetchuser');

// var JWT_Key = process.env.JWT_SECRET;

const {body,validationResult}=require('express-validator');
const multer = require('multer');

//api making for the call in app.use('/api/auth')

router.post('/createUser',[
    
    
    
    body('email','Enter a valid email').isEmail(),
    body('name','Name should be of length[3-20]').isLength({min:3,max:20}),
    body('password','Password must be at least 8 character').isLength({min:8}),
    body('password','Password must be Alphanumeric').isAlphanumeric(),
    body('address','Address is Required').isLength({min:3,max:40})
    
]
, async (req,res)=>{
    
    const {email,password}=req.body;

    //setting session to store user details
    req.session.user = { email,password };
    req.session.save();
    

   
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        
            
            //calling and creating an user object to map the data to user object from api

            
            //to generate salt which help to add additional code to the password and store to the database at hashing
            const salt=await bcrypt.genSalt(10);
            const setPassword= await bcrypt.hash(req.body.password,salt);
            const pw=req.body.password;
            
            //to generate token for the password
            const JWT_Key=password;

            //to store data to the mongoDB
            const user1= await User.create({
                name: req.body.name,
                email: req.body.email,
                password: setPassword,
                address: req.body.address,
            }).then((user1)=> {
                
                const data={
                    user:{
                        id:user1.id,
                        name:user1.name,
                        email:user1.email,
                        address:user1.address,
                        date:user1.date
        
                    }
                }

                //generationg token for the input password and send to the user
                const auth_Token=jwt.sign(data,JWT_Key);
                //  return res.json({auth_Token});
                 res.json({user:data.user, auth_Token:auth_Token});
                
                
                // return res.json(users)
            })
            .catch(
                (err)=>{   
                    console.log(err);
                    res.status(400).json({ error:"Dublicate Entry to the MongoDatabase:\nEnter new User data!!!!"})
                }

        );
      
         
        }
        
        
    else{

        
        res.status(400).json({ errors: errors.array() });
        
    }
    
});


// to authenticate user for login::login does not require

router.post('/login',
    
    [
        body('email','Enter a valid Email!!').isEmail(),
        body('password','Password must be at least 8 character').isLength({min:8}),
        body('password','Password must be Alphanumeric').isAlphanumeric(),
        body('password',"Password Cannot be Blank").exists()
    ],

    async (req,res)=>{

        const error=validationResult(req);
       if (!error.isEmpty()){
    return res.status(400).json({error: error.array()});

        }
     const {email,password}=req.body;

     //setting session to store user details
     req.session.user={email,password};
     req.session.save();


     console.log("login Session:"+req.session.user.email);

     try {
            
                        //to find the data exist in the database or not
                        const user= await User.findOne({email});
                        if(!user){
                            return res.status(400).json({error:'User does not exist\n.Please Login'});
                        }


                          //to compare password with database
                        const comparePassword=await bcrypt.compare(password,user.password);

                        if(!comparePassword){

                             res.status(400).json({error:"Enter valid Password!!"});
                            // return res.status(400).json({error:"Enter valid Password or Email!!"});
                        }

                        const payload={
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email,
                                date:user.date,


                            }
                        }

                        console.log("Photo buffer size:", user.photo?.data?.length);
console.log("Base64:", user.photo?.data?.toString('base64')?.substring(0, 100));

                        
                        const JWT_Key=password;
            
                        
                        // const JWT_Key = process.env.JWT_SECRET;
                        const auth_Token = jwt.sign(payload, JWT_Key);
                        

                      res.json(
                        {
                            user:payload.user,
                            auth_Token:auth_Token,
                            photo: {
                                  data: user.photo?.data?.toString('base64') || '',  // Ensure it is properly base64 encoded
                                  contentType: user.photo?.contentType || ''
                                   }
                    });
                      



                      
                    } catch (err) {
                        
                        console.error("Login error:", err.message);
                        return res.status(500).json({ error: "Internal Server Error" });
                        
                    }
                    
                }
            );
            
            
            //to get logged in info details from the database
        //to retrieve the user data and information

 router.post('/getuser',fetchuser,

            async (req,res)=>{


 
                try{
                    
                    const userID=req.user.id;
                    
                    const user=await User.findById(userID).select("-password");

                    return res.status(200).send({user});
    
            
            
            
            
            
        }
        catch(err){
            
           return res.status(500).json({error:"Internal Server Error:"});
            
        }
        
    }
)


//to get photo from the frontend and store to the mongodb

const storage=multer.memoryStorage();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 1 * 1024 * 1024 } // 1MB limit
  });


router.post('/upload-photo',upload.single('photo'), async (req,res)=>{

    
    //destructing of the id from the request body
    const {_id} =req.body;
    
    
    if (!req.file) {
        return res.status(400).json({ message: 'No photo uploaded' });
    }
    
    
    // // const photobuffer=req.formdata.buffer.toString('base64');
    // const photobuffer=req.file.buffer.toString('base64');
    
    try{
        
        const photobuffer = req.file.buffer.toString('base64');;// multer's `buffer` stores the file as binary data (Buffer)
    const updatedUser= await User.findByIdAndUpdate(_id, 
        {
            photo: {
                data: photobuffer,       // Store the binary data (buffer)
                contentType: req.file.mimetype // Store the MIME type
            }
          },
          { new: true } // returns updated document
        );
    
        // Send updated photo back to frontend
        res.json({
          success: true,
          photo: updatedUser.photo,
        });
}
catch(err){
    return res.status(500).json({success:false, error:err.message});
}



});

    
        

module.exports=router;