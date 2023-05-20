var express = require('express');
var router = express.Router();
var userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/feed",function(req,res)
{
  userModel.find().then(function(allusers)
  {
    res.render("feed",{allusers});
  });
  // res.render("feed"); 
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
    res.redirect("/");
  })
})

router.get("/users",function(req,res)
{
  userModel.find()
  .then(function(allusers)
  {
    res.send(allusers);
  })
})


router.get("/delete/:id",function(req,res)
{
  userModel.findOneAndDelete({_id : req.params.id})
  .then(function()
  {
    res.redirect("/users");
  });
})



module.exports = router;
