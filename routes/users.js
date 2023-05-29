var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Go");

var userSchema = mongoose.Schema(
  {
    username : String,
    password : String,
    email : String,
    profileimage : String,
    likes : {
     type : Array,
     defualt : [],
    }
  }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);