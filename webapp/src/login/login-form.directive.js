'use strict';

function LoginFormController(yeValidForm, $mdToast, $state, Usuario, $translate, capitalizeFilter) {
  var login = this;
  login.data = {};
  login.submit = submit;

  //////

  function submit(form) {
    var validForm = yeValidForm(form);
    if (!validForm.status) return $mdToast.showSimple(validForm.errorOne.message);

    Usuario.login(login.data)
      .$promise
      .then(function(user) {
        $state.reload();
      }, function(err) {
        $translate('LOGIN_SECTION.' + err.data.error.code)
          .then(function(message) {
            console.log(err);
            $mdToast.showSimple(capitalizeFilter(message));
          });
      });

  }
}

function loginForm() {

  return {
    scope: {},
    template: require('./templates/login-form'),
    controller: 'LoginFormController',
    controllerAs: 'login'
  }
}

var login = require('angular')
  .module('appLoginForm', [
    require('./../utils/capitalize.filter').name
  ])
  .directive('loginForm', loginForm)
  .controller('LoginFormController', LoginFormController)

module.exports = login;
