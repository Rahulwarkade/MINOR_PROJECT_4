var express = require('express');
var router = express.Router();
var userModel = require("./users");
const passport = require('passport');
var localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


// router.post("/create",function(req,res)
// {
//   userModel.create(
//     {
//       email : req.body.email,
//       fullname : req.body.fullname,
//       profileimage : req.body.profileimage,
//     }
//   ).then(function(createdusers)
//   {
//     res.redirect("/feed");
//   })
// })

router.get("/users",function(req,res)
{
  userModel.find()
  .then(function(allusers)
  {
    res.send(allusers);
  })
})

router.get('/profile',isLoggedIn,function(req,res)
{
  userModel.find()
  .then(function(allusers)
  {
    res.render('feed',{allusers})
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


router.get("/like/:id",function(req,res){
  // userModel.findOne({_id : req.params.id})
  // .then(function(user){
  //   user.likes++;

  //   user.save().then(function(){
  //     res.redirect('/feed');
  //   })
  // })
  
})

router.post('/register',function(req,res){
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    profileimage: req.body.profileimage,
  });

  userModel.register(newUser,req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
  .catch(function(e){
    res.send(e);
  })
})

router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/',
}),function(req,res){});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
