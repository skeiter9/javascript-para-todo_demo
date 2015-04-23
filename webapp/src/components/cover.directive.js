'use strict';

require('./styles/cover.styl');

function yemdCover($window, $timeout, $q, $$rAF) {


  function postLink(scope, element, attrs, mdSidenavCtrl) {
    var domReady;
    var watchHeight;

    var fixInSidenavLeft = (function() {
      if (mdSidenavCtrl === null) return resize();
      watchHeight = scope.$watch(function() {
        return mdSidenavCtrl.isOpen();
      }, function(status) {
        if (status) $$rAF(resize);
      })
    })();
    //watchPicture = attrs.$observe('picture', function(pic) {
      //resize();
    //});

    //$$rAF(resize);
    angular.element($window).on('resize', $$rAF.throttle(resize));

    function resize() {
      var height = (element[0].offsetWidth * (9 / 16)) + 'px';
      element.css({
        backgroundImage: 'url(' + attrs.picture + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: height
      });
    }

    scope.$on('$destroy', function(evt) {
      if (mdSidenavCtrl !== null) watchHeight();
      console.log('destroy cover');
    });

  }

  return {
    scope: {},
    priority: -1,
    require: '^?mdSidenav',
    restrict: 'E',
    link: postLink
  };

}

module.exports = require('angular')
	.module('components.cover', [])
	.directive('yemdCover', yemdCover);
