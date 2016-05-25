'use strict';

module.exports = function (spawn, action, callback) {;
  var grep = spawn('grep', ['ssh']);
  action(grep);
  grep.on('close', function (code, signal) {
    callback(code, signal);
  });
}
