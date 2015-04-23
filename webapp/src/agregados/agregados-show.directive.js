'use strict';

function controller() {

  var agregado = this;

}

function link(scope, elem, attrs, ctrl) {
}

function agregadosShow() {

  return {
    scope: {
      item: '='
    },
    restrict: 'E',
    template: require('./templates/agregados-show'),
    bindToController: true,
    controller: controller,
    controllerAs: 'agregado',
    link: link
  };

}

module.exports = require('angular')
  .module('appAgregadosShow', [])
  .directive('agregadosShow', agregadosShow);
