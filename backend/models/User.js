const mongoose=require("mongoose");

const {Schema}=mongoose;


const userSchema=new Schema({

name:{

    type:String,
    required:true

},

email:{
    type:String,
    required:true,
    unique:true
},

address:{
    type:String,
    required:true
},

password:{
type:String,
required:true
},

date:{
    type:Date,
    default:Date.now
    
},
photo:{
    data: Buffer,
    contentType: String
}

});


module.exports=mongoose.model("User",userSchema);