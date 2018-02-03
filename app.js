// ------------Express-----------------

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');

app.set('port', process.env.PORT); // application variable; only have to set port once;  used with app.get('port') in the app.listen function

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended:false })); // middleware to parse form data prior to using in controller

app.use('/api', routes);


var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
	console.log("Magic happens on port "+ port);
});



// require('./instantHello'); // runs immediately

// var goodbye = require('./talk/goodbye'); // will run when called
// var talk = require('./talk'); // will find the index.js file in the folder
// var question = require('./talk/question');

// talk.intro();
// talk.hello("Josh Bristol");

// var answer = question.ask("What is the meaning of life?");// if method returns a value, you can store the value and work with it.
// console.log(answer);

// goodbye();

//  -------Best practice to use app.use
//  app.use(express.static(path.join(__dirname, 'public')));
// -------or-----
// app.get('/', function(req, res){
// 	console.log("GET the homepage");
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, "public", "index.html"));
// });


// -------test routes 
// app.get('/json', function(req, res){
// 	console.log("GET the json");
// 	res
// 		.status(200)
// 		.json({"jsonData":true});
// });

// app.get('/file', function(req, res){
// 	console.log("GET the file");
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, 'app.js'));
// });
