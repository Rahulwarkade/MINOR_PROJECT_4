var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dbname");

var userSchema = mongoose.Schema(
  {
    email : String,
    fullname : String,
    profileimage : String,
    // likes : Number,
  }
);

module.exports = mongoose.model("user",userSchema);