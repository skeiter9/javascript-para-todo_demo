'use strict';

var dashboard = require('angular')
  .module('appDashboard', [
      require('./../layout').name,
      require('./dashboard-actions.factory').name,
      require('./../components/action.directive').name
    ]
  )
  .controller('DashboardController', require('./dashboard-controller'));

module.exports = dashboard;
