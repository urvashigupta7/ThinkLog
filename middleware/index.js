var blog = require("../model/blog.js");
var comment = require("../model/comment");
var middleware = {};
middleware.isloggedin = function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
middleware.auth=function auth(req,res,next){
    if(req.isAuthenticated()){
      res.redirect('/blogs');
    }
    else{
        return next();
    }

}
middleware.checkownership = function checkownership(req, res, next) {
    if (req.isAuthenticated()) {
        blog.findById(req.params.id, function (err, foundblog) {
            if (err || !foundblog) {
                res.redirect('back');
            }
            else {

                if (foundblog.author.id.equals(req.user._id)) {
                    return next();
                }
                else {
                    res.redirect('back');
                }

            }
        });
    }
    else {
        res.redirect('back');
    }


}
middleware.checkCommentOwnership = async function checkCommentOwnership(req,res,next){
    try{
    if(req.isAuthenticated()){
      const c=await comment.findById(req.params.commentId);
      if(c.author.id.equals(req.user._id)){
          return next();
      }else{
          res.redirect('back');
      }
      
    }else{
        res.redirect('back');
    }
   }catch(e){
       res.redirect('back');
   }
}
module.exports = middleware;