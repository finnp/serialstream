var util = require('util');
var Duplex = require('stream').Duplex;
var SerialPort = require('serialport').SerialPort;

function SerialStream(path, baudrate) {
  Duplex.call(this);
  var self = this;
  this.sp = new SerialPort(path, {baudrate: baudrate}, true);
  this.sp.on('data', function(data) {
    if(!self.push(data)) {
      self.pause();
    }
  });

  this.sp.on('close', function() {
    self.push(null);
  });
;}
util.inherits(SerialStream, Duplex);

SerialStream.prototype._read = function() {
  this.resume();
};

module.exports = SerialStream;