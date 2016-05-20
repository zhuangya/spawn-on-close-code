'use strict';

var assert = require('assert');

var grepChild = require('./');

['SIGTERM', 'SIGHUP', 'SIGKILL'].forEach(function (sig) {
  grepChild(function (p) {
    p.kill(sig);
  }, function (code, signal) {
    assert.equal(code, null);
    assert.equal(signal, sig);
  });
});
