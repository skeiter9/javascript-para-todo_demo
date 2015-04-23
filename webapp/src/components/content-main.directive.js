'use strict';

function mdxContentMain($timeout, $log, $window, $$rAF, yeVerge) {
  var init = false;
  var loops = 0;
  var domReady;
  return function link(scope, element) {
    function getHeightForContent() {
      element.css({height: (yeVerge.viewportH() - 64) + 'px'});
    }

    //function resize() {
      //domReady = $timeout(getHeightForContent, 0);
      //$$rAF(function() {
        //element.css({height: (yeVerge.viewportH() - 64) + 'px'});
      //});
    //}

    //var watchHeight = scope.$watch(function() {
      //return yeVerge.viewportH()
    //}, $$rAF.throttle(getHeightForContent));
    //console.log($$rAF.throttle);
    getHeightForContent();
    //angular.element($window).on('resize', $$rAF.throttle(getHeightForContent));
    //$window.onresize = $$rAF.throttle(getHeightForContent);
    $window.addEventListener('resize', $$rAF.throttle(getHeightForContent));

    scope.$on('$destroy', function() {
      $log.debug('destroy content');
      $window.removeEventListener('resize', $$rAF.throttle(getHeightForContent));
    });

  }
}

var contentMain = require('angular')
  .module('componentsContentMain', [])
  .directive('mdxContentMain', mdxContentMain);

module.exports = contentMain;
