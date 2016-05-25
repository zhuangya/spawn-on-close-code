'use strict';

var assert = require('assert');

var grepChild = require('./');

var originalSpawn = require('child_process').spawn;
var crossSpawn = require('cross-spawn');
var crossSpawnAsync = require('cross-spawn-async');

[
  { name: 'originalSpawn', fn: originalSpawn },
  { name: 'crossSpawn', fn: crossSpawn},
  { name: 'crossSpawnAsync', fn: crossSpawnAsync}
].forEach(function (spawn) {
  ['SIGTERM', 'SIGHUP', 'SIGKILL'].forEach(function (sig) {
    console.log(spawn.name, sig);
    grepChild(spawn.fn, function (p) {
      p.kill(sig);
    }, function (code, signal) {
      assert.equal(code, null);
      assert.equal(signal, sig);
    });
  });
});
