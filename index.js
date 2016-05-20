'use strict';

var spawn = require('child_process').spawn;

module.exports = function (action, callback) {;
  var grep = spawn('grep', ['ssh']);
  action(grep);
  grep.on('close', function (code, signal) {
    callback(code, signal);
  });
}
