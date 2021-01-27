var express = require("express");
var router = express.Router();
var Blog = require("../model/blog");
var middleware = require("../middleware");

router.get('/blogs', middleware.isloggedin, async function (req, res) {
    let page = req.query.page || 1;
    page = Number(page);
    let limit = 9;
    let skip = (page - 1) * limit;
    try {
        const filter = req.query.search || '';
        const search = filter === '' ? false : true;
        const re = new RegExp(filter);
        const blogs = await Blog.find({ title: { $regex: re, $options: 'i' } }).populate({path:'comments'}).skip(skip).limit(limit).sort({created:-1}).exec();
        const count = await Blog.countDocuments({ title: { $regex: re, $options: 'i' } });
        const showNext = count > limit * page ? true : false;
        res.render('index.ejs', { blogs: blogs, showNext: showNext, current: page, total: Math.ceil(count / limit), filter: filter, search });
    } catch (e) {
        console.log(err);
    }
});
router.get('/blogs/new', middleware.isloggedin, function (req, res) {
    res.render('new.ejs');
});
router.post('/blogs', middleware.isloggedin, function (req, res) {

   
    Blog.create(req.body.blog, function (err, newblog) {
        if (err) {
            res.render('new.ejs');
        }
        else {
            newblog.author.id = req.user._id;
            newblog.author.username = req.user.username;
            newblog.save();
            res.redirect('/blogs');
        }
    });
});
router.get('/blogs/:id', middleware.isloggedin, async (req, res)=> {
  try{
    const blog=await Blog.findById(req.params.id).populate({path:'comments', options: { sort: { 'createdAt': 1 } }}).exec();
    res.render('show.ejs',{blog:blog});
  }catch(e){
      console.log(e);
  }
});
router.get('/blogs/:id/edit', middleware.checkownership, function (req, res) {
    Blog.findById(req.params.id, function (err, editpost) {
        if (err) {
            res.redirect('blogs');
        }
        else {
            res.render('edit.ejs', { eblog: editpost });
        }
    });
});
router.put('/blogs/:id', middleware.checkownership, function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedblog) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});
router.delete('/blogs/:id', middleware.checkownership, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs');
        }
    });
});
module.exports = router;