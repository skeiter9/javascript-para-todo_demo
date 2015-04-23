'use strict';

function layoutConfig(
  $provide,
  $locationProvider,
  $translateProvider,
  $mdThemingProvider,
  $compileProvider,
  tmhDynamicLocaleProvider,
  LoopBackResourceProvider,
  $stateProvider,
  $urlRouterProvider) {

  var urlApi = 'http://localhost:3001/api';

  LoopBackResourceProvider.setUrlBase(urlApi);

  $locationProvider.html5Mode({
    enabled: true,
    requiBase: true
  });

  $provide.provider('apiConsama', function() {
    this.$get = function() {
      return {
        url: urlApi
      }
    }
  });

  $translateProvider
    .useStaticFilesLoader({
      prefix: 'public/langs/',
      suffix: '.json'
    })
    .fallbackLanguage('es');

  require('./settings/themes.js')($mdThemingProvider);

  tmhDynamicLocaleProvider.localeLocationPattern('/public/ngLocale/angular-locale_{{locale}}.js');
  tmhDynamicLocaleProvider.defaultLocale('es-pe');

  require('./layout.routes.js').routes($stateProvider);
  require('./layout.routes.js').rules($urlRouterProvider);

  require('./../dashboard/dashboard.routes').routes($stateProvider);
  require('./../dashboard/dashboard.routes').rules($urlRouterProvider);
  /***** production ***/
  //$compileProvider.debugInfoEnabled(false);
}

module.exports = layoutConfig;
