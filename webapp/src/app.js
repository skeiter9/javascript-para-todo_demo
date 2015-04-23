'use strict';

require('angular')
  .module('app', [
    require('./login').name,
    require('./agregados').name,
    require('./dashboard').name
  ])
