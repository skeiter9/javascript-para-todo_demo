'use strict';

function controller() {

  var cardModule = this;

}

function link(scope, elem, attrs, ctrl) {

}

function cardModule() {

  return {
    scope: {
      module: '='
    },
    restrict: 'E',
    priority: 900,
    template: require('./templates/card-module'),
    bindToController: true,
    controller: controller,
    controllerAs: 'cardModule',
    link: link
  };

}

module.exports = require('angular')
  .module('cardModule', [
    require('./card-toggle.directive').name,
    require('./list.directive').name
  ])
  .directive('cardModule', cardModule);
