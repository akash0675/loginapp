var express = require('express');
var router = express();

var User = require("../models/user");

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //validation
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'passwords do not match').equals(req.body.password);

  var error = req.validationErrors();
  if(errors) {
    res.render('register', {
      errors:errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      passowrd: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', "You are registered and can now login");

    req.redirect('/users/login');
  }
});

module.exports = router;
