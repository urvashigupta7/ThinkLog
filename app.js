var express=require('express');
var app=express();
var sanitizer=require('express-sanitizer');
var methodoverride=require('method-override');
var bodyparser=require('body-parser');
var mongoose =require("mongoose");
var blogroutes=require("./routes/blog");
var authroutes=require("./routes/auth");
var passport=require("passport");
var user=require('./model/user');
var localstrategy=require("passport-local");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.URL,{ useNewUrlParser: true});
app.use(require("express-session")
({
    secret:'rusty is cute',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next)
{   res.locals.currentUser=req.user;
    next();
});
app.use(express.static('public'));
app.use(methodoverride('_method'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(sanitizer());
app.use(authroutes);
app.use(blogroutes);

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log('server has started');
});
