'use strict';

function getVerge() {
  return require('verge');
}

var verge = require('angular')
  .module('appUtilsVerge', [])
  .factory('yeVerge', getVerge);

module.exports = verge;
