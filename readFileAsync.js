// asyncronous version  -- non-blocking

var fs = require('fs'); 

var onFileLoad = function(err, file){  // named callback function, better for unit testing; could just put it in the callback function below
		console.log("got the file");
};

console.log("Going to get a file");
fs.readFile("readFileSync.js", onFileLoad);  // could be the contents of the named callback function

console.log("app continues...");