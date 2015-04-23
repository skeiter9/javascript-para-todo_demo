'use strict';

require('./styles/action.directive');

function controller() {
  var action = this;
}

function mdxAction($compile, $timeout, $animate, $log, $mdMedia, yeVerge, $mdGesture, $mdTheming, $document, yePlatform) {

  function link(scope, elem, attrs, action) {

    elem.addClass('md-button md-fab md-fab-bottom-right bg-t p-0 m-0 o-v bs-n');
    var parent = angular.element($document).find('body');
    var backdrop = $compile(
      '<md-backdrop class="md-dialog-backdrop md-opaque ng-enter">'
    )(scope);
    $mdTheming.inherit(backdrop, elem);

    var domReady = $timeout(function() {
      angular.forEach(elem.find('section').find('button'), function(button, index) {
        angular.element(button).css({top: (((index + 1) * 48) * -1) + 'px'});
      });
    }, 0);

    if (angular.isUndefined(action.mdOptions)) {
      $log.warn('there are not option for action float');
      elem.detach();
      return;
    }

    action.toggle = false;
    action.touch = toggle;
    action.show = show;
    action.hide = hide;
    action.isTouch = yePlatform.isTouchScreen;

    elem[0].addEventListener('mouseenter', function() {
      scope.$apply(function() {
        show();
      });
    }, false);

    elem[0].addEventListener('mouseleave', function() {
      scope.$apply(function() {
        hide();
      });
    }, false);

    var touchBackdrop = scope.$watch(function() { return action.toggle }, function(status) {
      backdrop[0][status ? 'addEventListener' : 'removeEventListener']('touchstart', function(evt) {
        scope.$apply(function() {
          close(evt);
        });
      }, false);
    });

    function close(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      return hide();
    }

    function show() {
      action.toggle = true;
      elem.css({'z-index': 80, 'height': ((action.mdOptions.length * 48) + 56) + 'px'});
      $animate.enter(backdrop, parent);
    }

    function hide() {
      action.toggle = false;
      elem[0].style.height = '56px';
      elem.css({'z-index': 'auto'});
      $animate.leave(backdrop);
    }

    function toggle() {
      action.toggle = !action.toggle;
      action.toggle ? show() : hide();
    }

    function resize(newValue, oldValue) {

      if (newValue) {
        elem[0].style.right = (((yeVerge.viewportW() - 1000) / 4) - 28) + 'px';
      }else {
        //elem[0].style.right = '20px';
      }

    }

    scope.$on('$destroy', function() {
      $timeout.cancel(domReady);
      $log.debug('destroy action float');
      //actionResponsive();
    });

  }

  return {
    scope: {
      mdOptions: '='
    },
    restrict: 'E',
    template: require('./templates/action.directive'),
    link: link,
    controller: controller,
    controllerAs: 'action',
    bindToController: true
  };
}

var actionModule = require('angular')
  .module('component.action', [
		require('../utils/verge.factory').name,
		require('../utils/platform-environment.factory').name
	])
	.directive('mdxAction', mdxAction)

module.exports = actionModule;
