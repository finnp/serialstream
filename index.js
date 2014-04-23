var util = require('util');
var Duplex = require('stream').Duplex;
var SerialPort = require('serialport').SerialPort;

function SerialStream(path, baudrate) {
  Duplex.call(this);
  var self = this;
  this.serial = new SerialPort(path, {baudrate: baudrate}, true);
  this.serial.on('data', function(data) {
    if(!self.push(data)) {
      self.serial.pause();
    }
  });

  this.serial.on('close', function() {
    self.serial.push(null);
  });
;}
util.inherits(SerialStream, Duplex);

SerialStream.prototype._read = function() {
  this.serial.resume();
};

SerialStream.prototype._write = function(chunk, enc, done) {
  var self = this;
  self.serial.write(chunk, function() {
    self.serial.drain(done);
  });
};

module.exports = SerialStream;