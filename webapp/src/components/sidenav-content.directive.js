'use strict';

var $compile_;

function link(scope, elem, attrs, ctrl) {
  var uppateContent = scope.$watch('content', function() {
    elem.empty();
    var content = $compile_(angular.element(scope.content.html))(scope.content.scope || scope);
    elem.append(content);
  })

  scope.$on('$destroy', function() {
    console.log('destroy sidenav-content');
    uppateContent();
  });
}

function mdxSidenavContent($compile) {
  $compile_ = $compile;
  return {
    scope: {
      content: '='
    },
    restrict: 'A',
    link: link
  };

}

module.exports = require('angular')
  .module('componentsSidenavContent', [])
  .directive('mdxSidenavContent', mdxSidenavContent);
