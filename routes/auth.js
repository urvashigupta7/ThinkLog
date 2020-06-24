var express=require("express")
var router=express.Router();
var passport=require("passport")
var middleware=require("../middleware");
var user=require('../model/user');
router.get('/',middleware.auth,function(req,res)
{ 
    res.render('home.ejs');
})

router.get('/register',middleware.auth,function(req, res) {
    res.render('register.ejs')
   
})
router.post('/register',middleware.auth,function(req, res) {
    
     user.register(new user({username:req.body.username}),req.body.password,function(err,newuser)
     {
         if(err)
         {
             console.log(err)
             return res.redirect('/register');
         }
         else{
             passport.authenticate('local')(req,res,function()
             {
                 res.redirect('/blogs');
             })
         }
     })
 })
 router.get('/login',middleware.auth,function(req, res) {
     res.render('login.ejs')
 })
 router.post('/login',middleware.auth,passport.authenticate('local',
 {
     successRedirect:'/blogs',
     failureRedirect:'/login'
 }),function(req,res)
 {
     
 })
 router.get('/logout',function(req, res) {
    
     req.logout();
     res.redirect('/')
 })
 module.exports=router;