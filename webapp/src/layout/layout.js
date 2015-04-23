'use strict';

require('angular-material-css');
require('mdi');
require('./styles/styles');

require('tweenMax');
require('angular-dynamic-locale');
require('apiLb');

require('angular-material');
require('angular-translate');

var layout = require('angular')
  .module('appLayout', [
    require('ngFx'),
    require('ui.router'),
    require('angular-animate'),
    require('angular-resource'),
    require('angular-aria'),
    require('angular-messages'),
    require('angular-touch'),
    'ngMaterial',
    'pascalprecht.translate',
    'appApiLb',
    'tmh.dynamicLocale',
    require('./layout-data.service').name,
    require('./../components/card-module.directive').name,
    require('./../components/content-main.directive').name,
    require('./../components/sidenav-content.directive').name,
    require('./../components/cover.directive').name,
    require('./../components/input-picture.directive').name,
    require('./../components/menu.directive').name,
    require('./../utils/api-consama.factory').name,
    require('./../utils/icon-module.factory').name,
    require('./../utils/platform-environment.factory').name,
    require('./../utils/find-by.factory').name,
    require('./../utils/formate-list.factory').name,
    require('./../utils/verge.factory').name,
    require('./../utils/capitalize.filter').name
  ])
  .config(require('./layout.config'))
  .run(require('./layout.run'))
  .controller('LayoutController', require('./layout.controller'));

require('angular-translate-loader-static-files');

module.exports = layout;
