'use strict';

function LayoutController($translate, $mdSidenav, layoutData, tmhDynamicLocale) {
  var layout = this;

  layout.data = layoutData;
  layout.currentLanguage = layoutData.languages.preferred;

  layout.changeLanguage = function(key) {
    tmhDynamicLocale.set(key);
    layout.currentLanguage = key;
    $translate.use(key)
  };

  layout.sidenavRightContentChange = function(html, scope) {
    layoutData.sidenav.right.content = {
      html: html,
      scope: scope
    }
  };

  layout.sidenavOpen = function(componentId, cbPost) {
    $mdSidenav(componentId).open()
    .then(function() {
      if(angular.isDefined(cbPost) && angular.isFunction(cbPost)) cbPost();
    });
  };

  layout.sidenavClose = function(componentId, cbPost) {
    $mdSidenav(componentId).close()
      .then(function() {
        if(angular.isFunction(cbPost)) cbPost();
      });
  };

}

module.exports = LayoutController;
