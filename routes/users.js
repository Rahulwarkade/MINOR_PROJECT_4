var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/");

var userSchema = mongoose.Schema(
  {
    email : String,
    fullname : String,
    profileimage : String,
    likes : {
     type : Number,
     defualt : 0,
    }
  }
);

module.exports = mongoose.model("user",userSchema);