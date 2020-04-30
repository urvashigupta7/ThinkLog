var mongoose =require("mongoose");
var user=require("./user");
var blogschema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    author:
    {
        id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        username:String
    },
    created:{type:Date,default:Date.now}
});
var Blog=mongoose.model('Blog',blogschema);
module.exports=Blog;