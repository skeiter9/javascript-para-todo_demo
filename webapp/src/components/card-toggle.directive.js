'use strict';

var $animate_;
var $timeout_;

function cardToggleSettingsController($mdDialog, layoutData) {
  var settings = this;
  settings.closeDialog = function() { $mdDialog.hide()};
  settings.changeTypeContent = function(inTable) {
    layoutData.ui[settings.moduleNamePlural].listType = (inTable) ? 'table' : 'list';
  };
}

function cardToggleController($scope, $attrs, $mdDialog, $translate, yeIconModule, $log, layoutData) {

  var cardToggle = this;

  layoutData.ui[cardToggle.moduleNamePlural] = {
    title: cardToggle.moduleNamePlural,
    icon: yeIconModule(cardToggle.moduleNamePlural),
    showContent: layoutData.ui.card.showContent,
    listType: layoutData.ui.list.type
  }
  cardToggle.settings = layoutData.ui[cardToggle.moduleNamePlural];

  cardToggle.settingsDialog = function(evt) {

    $mdDialog.show({
      resolve: {
        moduleName: function() {
          return $translate(layoutData.ui[cardToggle.moduleNamePlural].title.toUpperCase())
            .then(function(word) { return word.toUpperCase()})
        }
      },
      targetEvent: evt,
      template: require('./templates/card-toggle-settings')(),
      bindToController: true,
      controller: 'cardToggleSettingsController',
      controllerAs: 'settings',
      clickOutsideToClose: true,
      locals: {
        inTable: ((layoutData.ui[cardToggle.moduleNamePlural].listType === 'table') ? true : false),
        moduleNamePlural: layoutData.ui[cardToggle.moduleNamePlural].title
      }
    });
  };

}

function postLink(scope, elem, attrs, cardToggle) {

  elem.addClass('bg-t bs-n');

  var toolbarInside = elem.find('md-toolbar');
  var cardContent = elem.find('md-card-content');

  var buttonToggle = angular.element(elem[0].querySelector('.md-fab-toggle'));

  cardToggle.toggle = function() {

    cardToggle.settings.showContent = !cardToggle.settings.showContent;

    var toggleClass = 'fx-fade-' + ((cardToggle.settings.showContent) ? 'down' : 'up');

    $animate_.animate(buttonToggle.find('span'), {transform: 'scale(0)'}, {transform: 'scale(1)'}, 'fx-fade-normal');
    $animate_.animate(cardContent, {}, {}, toggleClass)
      .then(function() {
        if (cardToggle.settings.showContent) toolbarInside.removeClass('br-1111');
        else toolbarInside.addClass('br-1111');
      });

  };

}

function mdCardToggleDirective($animate, $timeout) {

  $animate_ = $animate;
  $timeout_ = $timeout;

  return {
    scope: {
      moduleNamePlural: '@'
    },
    restrict: 'A',
    priority: -1,
    template: require('./templates/card-toggle'),
    transclude: true,
    bindToController: true,
    controller: 'cardToggleController',
    controllerAs: 'cardToggle',
    link: postLink
  };

}

module.exports = require('angular')
  .module('componentsCardToggle', [])
  .controller('cardToggleController', cardToggleController)
  .controller('cardToggleSettingsController', cardToggleSettingsController)
  .directive('mdCardToggle', mdCardToggleDirective);
