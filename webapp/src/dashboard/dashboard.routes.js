'use strict';

var controllerAs;

function routesDashboard(stateProvider) {

  stateProvider
    .state('dashboard', {
      abstract: true,
      resolve:{
        agregados: function(Comic) {
          return Comic.find().$promise;
        }
      },
      url: '/',
      parent: 'layout',
      views: {
        'content@base': {
          templateProvider: function() {
            if (angular.isDefined(localStorage['$LoopBack$accessTokenId'])) {
              return require('./views/layout')();
            }else return require('./../login/views/login')();
          },
          controllerProvider: function(){
            if (angular.isDefined(localStorage['$LoopBack$accessTokenId'])) {
              return 'DashboardController'
            }else return 'LoginController'
          },
          controllerAs: 'dashboardVm'
        }
      }
    })
    .state('dashboard.index', {
      url:''
    })
    .state('dashboard.new', {
      url: 'new',
      views: {
        'sidenavRight@base': {
          template:'kokoko',
          controller: function($controller, layoutData) {
            var layout = $controller('LayoutController');
            console.log(layout);
            layout.sidenavOpen('right');
          }
        }
      }
    });

};

function rulesDashboard(urlRouterProvider) {
  urlRouterProvider
    .when('', '/');
}

exports.routes = routesDashboard;
exports.rules = rulesDashboard;
