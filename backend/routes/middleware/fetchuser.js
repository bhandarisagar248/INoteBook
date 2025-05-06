const jwt=require('jsonwebtoken');
var storeSession;
const fetchuser=(req,res,next)=>{
    
  
  //  const JWT_Key=process.env.JWT_SECRET;
  
  // console.log("Fetch user session:"+req.session.user.email);
  const sessionUser = req.session.user;
  if (sessionUser) {
    storeSession=sessionUser;  
      var JWT_Key=storeSession.password;
      
      console.log(JWT_Key);
      }
      else{
        console.log("No key for the login");
        console.log(JWT_Key);
      }
    
    const tokenHead =req.header('Authorization');
    //  JWT_Key =req.header('password');
    // JWT_Key="sagar123";
 
 
    // if(!JWT_Key){
    //     JWT_Key=req.body?.password;

    // }

    if(!tokenHead){
         
        
         return res.status(403).send({error:"Please Use Valid Authentication Token"});
        
    }

    
    const token = tokenHead;



try {
   const data= jwt.verify(token,JWT_Key);

   if(!data || !data.user || !data.user.id){
    return res.status(401).json({error:"Invalid Token Structure"});
   }

   //setting the user data  to the req object
   req.user=data.user;
    next();
    
} catch (error) {
    res.status(403).send({error:"Please Use Valid Token"});
    
}




}

 module.exports=fetchuser;