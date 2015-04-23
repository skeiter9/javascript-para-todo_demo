'use strict';

function loginRoutes($stateProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      parent: 'layout',
      views: {
        'content@base': {
          template: require('./views/login.jade'),
          controller: 'LoginController',
          controllerAs: 'loginVm'
        }
      }
    });

}

module.exports = loginRoutes;
