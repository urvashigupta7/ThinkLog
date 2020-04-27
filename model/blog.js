var mongoose =require("mongoose");
var blogschema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});

var Blog=mongoose.model('Blog',blogschema);
module.exports=Blog;