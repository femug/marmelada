'use strict';

var marmelada = require('./');
var test = require('tape');

test('marmelada test suite', function(t) {
  t.equal(marmelada('foo'), true, '');
  t.end();
});
