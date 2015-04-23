'use strict';

require('apiLb');

function apiConsamaHandle(apiConsama) {
  return function(container, file, type) {
    var baseFile = file.substring(0, file.lastIndexOf('.'));
    var ext = file.substring(file.lastIndexOf('.'));
    return apiConsama.url + '/' + 'pictures' + '/' + container + '/' + 'download' + '/' + baseFile + '-' + (type || 'standard') + ext;
  };
}

var apiConsama = require('angular')
  .module('apiConsama', [
    'appApiLb'
  ])
  .factory('apiConsamaUrlPhoto', apiConsamaHandle);

module.exports = apiConsama;
