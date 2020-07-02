var mongoose = require("mongoose")
var passportlocalmongoose = require("passport-local-mongoose")
var userschema = new mongoose.Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            trim: true
        }
    })
userschema.plugin(passportlocalmongoose);
var user = mongoose.model('user', userschema);
module.exports = user;