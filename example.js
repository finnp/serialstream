var SerialStream = require('./index.js');

var test = new SerialStream('/dev/ttyp8', 115200);

process.stdin.pipe(test).pipe(process.stdout);