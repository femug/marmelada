'use strict';

var minimist = require('minimist');
var multiline = require('multiline');
var defaults = {
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    v: 'version'
  }
};
var version = require('./package.json').version;
var help = multiline(function() {/*

Usage: marmelada [PATH] [OPTIONS]

  Randomly select people for FEMUG-SP's meetings.

Example:
  marmelada . --foo=bar

Options:
  -v --version              Display current software version.
  -h --help                 Display help and usage details.
  -f --foo                  Some custom option.


*/});

function run(argv) {
  console.log('marmelada is alive!');
}

exports.exitCode = 0;

exports.stdout = process.stdout;
exports.stderr = process.stderr;

exports.parse = function(options) {
  return minimist(options, defaults);
};

exports.run = function(argv) {
  exports.exitCode = 0;

  if(argv.help) {
    exports.stderr.write(help);
    return;
  }

  if(argv.version) {
    exports.stderr.write('marmelada v' + version + '\n');
    return;
  }

  run(argv);
};
