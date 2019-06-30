var express=require('express');
var app=express();
var sanitizer=require('express-sanitizer');
var methodoverride=require('method-override');
var bodyparser=require('body-parser');
var mongoose =require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect('mongodb+srv://urvashi:delhi2018@cluster0-lhmgd.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true});
app.use(express.static('public'));
app.use(methodoverride('_method'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(sanitizer());
var blogschema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});
var Blog=mongoose.model('Blog',blogschema);
// Blog.create({
//     title:'testblog',
//     image:'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     body:'HELLO THIS IS A BLOG POST'
// })
app.get('/',function(req,res)
{
   
    res.redirect('/blogs');
});
app.get('/blogs',function(req,res)
{
     console.log('someone checked your website');
    Blog.find({},function(err,blogs)
    {
        if(err)
        {
            console.log(err);
        }
        else
        res.render('index.ejs',{blogs:blogs});
    });
    
});
app.get('/blogs/new',function(req,res)
{
    res.render('new.ejs');
});
app.post('/blogs',function(req,res)
{
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newblog)
    {
        if(err)
        {
            res.render('new.ejs');
        }
        else
        {
            res.redirect('/blogs');
        }
    });
});
app.get('/blogs/:id',function(req,res)
{
    Blog.findById(req.params.id,function(err,foundblog)
    {
        if(err)
        {
            res.redirect('/blogs');
        }
        else{
        res.render('show.ejs',{blog:foundblog});
        }
    });
});
app.get('/blogs/:id/edit',function(req,res)
{
    Blog.findById(req.params.id,function(err,editpost)
    {
        if(err)
        {
            res.redirect('blogs');
        }
        else
        {
            res.render('edit.ejs',{eblog:editpost});
        }
    });
});
app.put('/blogs/:id',function(req,res)
{
      req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog)
    {
        if(err)
        {
            res.redirect('/blogs');
        }
        else
        {
            res.redirect('/blogs/'+req.params.id);
        }
    });
});
app.delete('/blogs/:id',function(req,res)
{
    Blog.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect('/blogs');
        }
        else{
            res.redirect('/blogs');
        }
    });
});
app.listen(3000,function(){
    console.log('server has started');
})