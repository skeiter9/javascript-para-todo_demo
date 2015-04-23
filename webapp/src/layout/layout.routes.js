'use strict';

function getRoutes(stateProvider) {

  stateProvider

    .state('base', {
      abstract: true,
      url: '',
      template: require('./templates/layout.jade'),
      controller: 'LayoutController',
      controllerAs: 'layout'
    })

    .state('layout', {
      parent: 'base',
      abstract: true,
      url: '',
      views: {
        'appbar': {
          template: require('./templates/appbar.jade')
        },
        'sidenavLeft': {
          template: require('./templates/sidenav-left.jade')
        }
      }
    })

    .state('404', {
      url: '/404',
      parent: 'layout',
      views: {
        'content@base': {
          template: require('./views/404.jade')
        }
      }
    })

    .state('noLogout', {
      url: '/unauthorized',
      parent: 'layout',
      views: {
        'content@base': {
          template: require('./views/unauthorized.jade')
          //controller: 'View404Controller',
          //controllerAs: 'vm'
        }
      }

    })

}

function getRules(urlRouterProvider) {

  urlRouterProvider
    .rule(function rule($injector, $location) {
      var path = $location.path();
      var normalized = path.toLowerCase();
      if (path !== normalized) return normalized;
    })
    .otherwise('/404');

}

exports.routes = getRoutes;
exports.rules = getRules;
