var SerialStream = require('./index.js');

var test = new SerialStream('/dev/ttyp8', 115200);

test.pipe(process.stdout);