var mongoose =require("mongoose");
var user=require("./user");
var comment=require("./comment");
var blogschema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    likes:{
        type:Number,
        default:0
    },
    likedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    author:
    {
        id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    created:{type:Date,default:Date.now}
});
blogschema.virtual('comment',{
    ref:'comment',
    localField:'_id',
    foreignField:'author._id'
})
var blog=mongoose.model('blog',blogschema);
module.exports=blog;