'use strict';

module.exports = require('angular')
  .module('appAgregados', [
    require('./agregados-show.directive.js').name,
    require('./agregados-form.directive.js').name
  ]);
