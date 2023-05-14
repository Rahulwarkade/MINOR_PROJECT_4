var express = require('express');
var router = express.Router();
var userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/feed",function(req,res)
{
  res.render("feed");
})

router.post("/create",function(req,res)
{
  userModel.create(
    {
      email : req.body.email,
      fullname : req.body.fullname,
      profileimage : req.body.profileimage
    }
  ).then(function(createdusers)
  {
    res.send(createdusers);
  })
})

module.exports = router;
