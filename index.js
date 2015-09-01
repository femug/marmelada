'use strict';

var request = require('request');
var _ = require('lodash');
var sprintf = require('util').format;
var logUpdate = require('log-update');
var spinner = require('elegant-spinner');
var frame = spinner();
var organizers = ['rafaelrinaldi', 'lucasmazza', 'danielfilho'];
var ignore = organizers;
var options = {};
var animation;

function loading() {
  // Will start a fancy loading animation
  frame = spinner();
  animation = setInterval(function() {
    logUpdate(frame());
  }, 100);
}

function loaded() {
  clearInterval(animation);
  logUpdate('');
}

function fetch(url) {
  var requestOptions = {
    /**
    * Big arbitrary number so we always get a fresh full list.
    * There's probably a better way to do it though.
    */
    uri: url + '/999.json',
    method: 'GET',

    /**
    * Use this flag so we don't need to handle w/ cert. signature.
    * Ideally we should pass an API key and token, but that didn't worked at all.
    * Lots of people w/ the same issue, I've posted on Discourse's main forum to see what's up.
    */
    rejectUnauthorized: false,
    json: true
  };

  return new Promise(function(resolve, reject) {
    request(requestOptions, function(error, response, body){
      if(error) {
        reject(error);
      }

      resolve(body);
    });
  });
}

function parse(data) {
  /**
  * For some reason the API don't always return all the participants.
  * So what I do here is to combine the results from "posts" and "participants".
  */
  var posts = data.post_stream.posts;
  var replies = data.details.participants;
  var participants = posts.concat(replies);

  participants = _.pluck(participants, 'username');
  participants = _.uniq(participants);

  if(options.ignore) {
    ignore = ignore.concat(options.ignore.replace(/\s/g, '').split(','));
  }

  // Remove items that should be ignored if there are any
  _.remove(participants, function(participant) {
    return _.includes(ignore, participant);
  });

  return participants;
}

function select(list) {
  // If "total" is not specified on the options, it will retrieve the full list
  var total = options.total || list.length;
  var index = -1;
  var haystack = list.concat();
  var winners = [];
  var needle;

  while(++index < total) {
    // Pick someone randomly
    needle = _.sample(haystack);
    // Remove the winner from the draw list
    haystack = _.without(haystack, needle);
    // Update the winners list
    winners.push(needle);
  }

  return winners;
}

function format(list) {
  /**
  * User can customize the output.
  * By default it's the username followed by a new line.
  */
  var template = options.format || '%s';

  return list.map(function(item) {
    return sprintf(template, item) + '\n';
  }).toString().replace(/\,/gm, '').trim();
}

function output(input) {
  loaded();
  // Output the result to stdout
  logUpdate(input);
}

module.exports = function(url, _options) {
  options = _options;
  loading();

  fetch(url)
    .catch(function(error) {
      output(error);
    })
    .then(parse)
    .then(select)
    .then(format)
    .then(output);
};
