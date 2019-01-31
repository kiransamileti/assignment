var express = require('express');
var path=require('path');	
var data=require('./data');
var fs=require('fs');

var app = express.Router();
var id=require('./user');
// Get Homepage

app.get('/', ensureAuthenticated, function(req, res)
{
	data.findproject(function(err,data){
		if(!err)
			
			res.render('index',{title:data});
	});
	
	

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}


}

app.get('/project',function(req,res){
	res.render('posts');
})

app.post('/add',function(req,res)
{
    var projectname=req.body.name;
    var date=req.body.date;
    var body=req.body.text;
    
	fs.readFile('project.json', 'utf-8', function(err, data) 
	{
		if (err) throw err
		var arrayOfObjects = JSON.parse(data)
		  var details=
		  {
			id:arrayOfObjects.users.length+1,
			projectname:projectname,
			date:date,
			body:body

		  };
		  arrayOfObjects.users.push(details);
		  
		  fs.writeFile('project.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) 
		  {
			if (err) throw err
			console.log('Done!');
			res.redirect('/project');
		  })
		
		
	})
		
    
});

app.get('/project/:id',function(req,res){
	var id=req.params.id;
	data.getprojectid(id,function(err,data){
		if(err)
		console.log(err);
		else{
			res.render('project',{title:data});
		}
	})
})

app.get('/customer',function(req,res){

	data.findcustomer(function(err,data){
		if(err)
		console.log(err);
		else{
			res.render('customer',{title:data});
		}
	})
})

app.get('/form',function(req,res){
	res.render('form');
	
})

app.post('/form',function(req,res){
	var name=req.body.name;
	var phonenumber=req.body.phonenumber;
	var email=req.body.email;
	fs.readFile('contact.json', 'utf-8', function(err, data) 
	{
		if (err) throw err
		var arrayOfObjects = JSON.parse(data)
		  var details=
		  {
			id:arrayOfObjects.users.length+1,
			name:name,
			phonenumber:phonenumber,
			email:email

		  };
		  arrayOfObjects.users.push(details);
		  
		  fs.writeFile('contact.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) 
		  {
			if (err) throw err
			console.log('Done!');
			res.redirect('/form');
		  })
		
		
	})
	

})

module.exports = app;
