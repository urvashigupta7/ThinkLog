var blog = require("../model/blog.js");
var middleware = {};
middleware.isloggedin = function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
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
module.exports = middleware;