// child process keeps it non-blocking

var child_process = require('child_process');

console.log(1);

var newProcess = child_process.spawn('node', ['_fibonacci.js'],{stdio: 'inherit'});  // stdio:inherit will force it to run in the same console

console.log(2);