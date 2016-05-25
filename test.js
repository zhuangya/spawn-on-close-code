'use strict';

var tap = require('tap');

var grepChild = require('./');

var originalSpawn = require('child_process').spawn;
var crossSpawn = require('cross-spawn');
var crossSpawnAsync = require('cross-spawn-async');

var spawns = [
  { name: 'originalSpawn', fn: originalSpawn },
  { name: 'crossSpawn', fn: crossSpawn},
  { name: 'crossSpawnAsync', fn: crossSpawnAsync}
];

var signals = ['SIGTERM', 'SIGHUP', 'SIGKILL'];

tap.test('spawn and signal', function (t) {
  spawns.forEach(function (spawn, spawnIndex) {
    signals.forEach(function (sig, sigIndex) {
      grepChild(spawn.fn, function (p) {
        p.kill(sig);
      }, function (code, signal) {
        t.equal(code, null);
        t.equal(signal, sig);

        if (spawnIndex === 0 && sigIndex === 0) {
          t.end();
        }
      });
    });
  });
});

