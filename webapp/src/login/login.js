'use strict';

var login = require('angular')
  .module('appLogin', [
    require('./../layout').name,
    require('./login-form.directive').name,
    require('./../utils/valid-form.factory').name
  ])
  .controller('LoginController', require('./login.controller'));

module.exports = login;
