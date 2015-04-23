'use strict';

function capitalizWord(word) {
  var wordResult = word.toLowerCase();
  return wordResult.substring(0, 1).toUpperCase() + wordResult.substring(1);
}

function capitalize() {
  return capitalizWord;
}

module.exports = require('angular')
	.module('components.capitalize', [])
	.filter('capitalize', capitalize);
