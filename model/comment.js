var mongoose = require("mongoose");
var user=require("./user");
var commentSchema=new mongoose.Schema({
   text:{
       type:String,
       required:true,      
   },
   author:{
       id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user",
       },
       username:String
   },
   createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model("comment",commentSchema);
