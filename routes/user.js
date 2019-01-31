var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var fs=require('fs');
var data=require('./data');
var app=express();




app.get('/register', function(req, res){
	res.render('register');
});

app.post('/verify',function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	console.log(name+email+username+password+password2);
	if(password==password2){
		
		fs.readFile('data.json', 'utf-8', function(err, data) {
		  if (err) throw err
		
		  var arrayOfObjects = JSON.parse(data)
		  
		  var details={
			id:arrayOfObjects.users.length+1,
			name:name,
			username:username,
			email:email,
			password:password
		  };
		  arrayOfObjects.users.push(details)
		  console.log(arrayOfObjects)
		
		  fs.writeFile('data.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
			if (err) throw err
			console.log('Done!')
		  })
		})
		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/register');
	  }else{
		res.render('signup',{error:"password doesnt matched"});
	  }
})

// Login
app.get('/login', function(req, res){
	res.render('login');
});

// Register User

passport.use(new Strategy(
	function(username, password, cb) {
	  data.findByUsername(username, function(err, user) {
		if (err) { return cb(err); }
		if (!user) { return cb(null, false); }
		if (user.password != password) { return cb(null, false); }
		return cb(null, user);
	  });
	}));
  
  passport.serializeUser(function(user, cb) {
	cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
	data.findById(id, function (err, user) {
	  if (err) { return cb(err); }
	  cb(null, user);
	});
  });

app.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
	  req.session.user=user;
    res.redirect('/');
  });

app.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = app;