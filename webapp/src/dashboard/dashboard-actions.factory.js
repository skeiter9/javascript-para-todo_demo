'use strict';

function yeActions(layoutData, yeIconModule, $state) {
  return function(modulesForUser) {
    var actions = [];
    angular.forEach(modulesForUser, function(module) {
      if (module.read) {
        actions.push({
          icon: yeIconModule(module.pluralName),
          theme: module.pluralName,
          name: 'new_' + module.name,
          click: function() {
            $state.go('^.new');
          }
        });
      }
    });
    return actions;
  }
}

var actionsModule = require('angular')
  .module('dashboardActions', [])
  .factory('yeActions', yeActions)

module.exports = actionsModule;
