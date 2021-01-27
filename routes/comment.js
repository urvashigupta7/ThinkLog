var express=require("express");
var router=express.Router();
var comment=require("../model/comment");
var blog=require("../model/blog");
const middleware = require("../middleware");

router.post('/blogs/:id/comment',middleware.isloggedin,async(req,res)=>{
  try{
  var pusher=req.app.get('pusher');

  const findblog=await blog.findById(req.params.id);
  req.body.author={
    id:req.user._id,
    username:req.user.username
  }
  const newcomment=await comment.create(req.body);
  findblog.comments.push(newcomment);
  findblog.save();
  pusher.trigger(`comment-${req.params.id}`,'new-comment',newcomment);
  res.redirect(`/blogs/${req.params.id}`);
  }catch(e){
    console.log(e);
  }
})

router.put('/blogs/:id/comment/:commentId',middleware.checkCommentOwnership,async(req,res)=>{
  try{
  const tobeedited=await comment.findById(req.params.commentId);
  tobeedited.text=req.body.text;
  tobeedited.save();
  res.redirect(`/blogs/${req.params.id}`);
  }catch(e){
    console.log(e);
  }
})
router.delete('/blogs/:id/comment/:commentId',middleware.checkCommentOwnership,async(req,res)=>{
  try{
  const tobedeleted=await comment.findByIdAndRemove(req.params.commentId);
  res.redirect(`/blogs/${req.params.id}`);
  }catch(e){
    console.log(e);
  }
})

module.exports=router;