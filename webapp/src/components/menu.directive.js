'use strict';

require('./styles/menu');

function controller() {

  var menu = this;
  menu.showOptions = false;
  menu.toggleOptions = function() {
    menu.showOptions = !menu.showOptions;
  }
}

function mdxMenu(yePlatform) {
  function postLink(scope, elem, attrs, menu) {

    angular.element(elem[0].querySelector('.md-fab'))
      .on(yePlatform.isTouchScreen ? 'touchstart' : 'click' , function() { scope.$apply(function() {menu.toggleOptions()})});

    elem.on('mouseleave', function() {
      if(menu.showOptions) {
        scope.$apply(function() {
          menu.toggleOptions();
        })
      }
    });

  }

  return {
    scope: {},
    restrict: 'E',
    bindToController: true,
    controller: controller,
    controllerAs: 'menu',
    link: postLink
  };

}

function mdxMenuOptions($animate) {

  function mdxOptionsPostLink(scope, elem, attrs, menu) {
    elem.addClass('md-whiteframe-z2');

    scope.$watch(function() {return menu.showOptions},
      function(toggle) {
        $animate[toggle ? 'removeClass' : 'addClass'](elem, 'md-leave');
        $animate[toggle ? 'addClass' : 'removeClass'](elem, 'md-active');

      });

  }

  return {
    scope: {},
    require: '^mdxMenu',
    restrict: 'E',
    link: mdxOptionsPostLink
  };

}

function mdxMenuOption($mdInkRipple, yePlatform) {

  return {
    restrict: 'E',
    require: '^mdxMenu',
    link: function(scope, elem, attrs, mdxMenu) {
      elem.on(yePlatform.isTouchScreen ? 'touchstart' : 'click' , function() { scope.$apply(function() {mdxMenu.toggleOptions()})});
      $mdInkRipple.attachButtonBehavior(scope, elem, {
        isMenuItem: true
      });
    }
  };

}

module.exports = require('angular')
  .module('componentsMdxMenu', [])
  .directive('mdxMenu', mdxMenu)
  .directive('mdxMenuOptions', mdxMenuOptions)
  .directive('mdxMenuOption', mdxMenuOption);
