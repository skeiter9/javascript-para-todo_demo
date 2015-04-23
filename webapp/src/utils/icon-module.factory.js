'use srict';

function getIconModule(layoutData) {
  return function (modulePluralName) {
    var iconName = 'checkbox-blank-circle-outline';
    if (angular.isDefined(layoutData.modules[modulePluralName])) iconName = layoutData.modules[modulePluralName].icon;
    return iconName;
  }
}

var iconModule = require('angular')
  .module('iconModule', [])
  .factory('yeIconModule', getIconModule);

module.exports = iconModule;
