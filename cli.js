'use strict';

var marmelada = require('./');
var minimist = require('minimist');
var multiline = require('multiline');
var defaults = {
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    v: 'version',
    f: 'format',
    t: 'total',
    i: 'ignore'
  }
};
var version = require('./package.json').version;
var help = multiline(function() {/*

Usage: marmelada [URL] [OPTIONS]

  Randomly select people for FEMUG-SP's meetings.

Example:
  marmelada http://sp.femug.com/t/femug-42-nasa --total 10

Options:
  -v --version              Display current software version.
  -h --help                 Display help and usage details.
  -f --format               Output format.
  -t --total                Total spots available for the meeting (defaults to list size).
  -i --ignore               Ignore list (comma separated and case sensitive).

*/});

function run(argv) {
  var url = argv._[0];

  if(!url) {
    exports.stderr.write('You must provide at least an URL');
    exports.exitCode = 1;
    return;
  }

  marmelada(url, argv);
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
