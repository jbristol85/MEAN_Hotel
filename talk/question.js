var answer = "Now that's a good questions!";

module.exports.ask = function(question){
	console.log(question);
	return answer;
};  // expose the method called ask by chaining it to module.exports