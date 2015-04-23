'use strict';

module.exports = angular
  .module('components.validForm', [])
  .factory('yeValidFormMessage', validFormMessage)
  .factory('yeValidFormFields', validFormFields)
  .factory('yeValidForm', validForm);

function validForm (yeValidFormMessage){

  return function(form) {

    if (form.$pristine) {

      form.$setDirty();

      return {
        status:false,
        message: 'Debe llenar los campos solicitados',
        errorOne: {
          message: 'Debe llenar los campos solicitados'
        }
      };
    }

    if (form.$invalid) {

      var errors = {};
      var errorOne = {};

      angular.forEach(form.$error, function(value, typeError) {

        angular.forEach(value, function(inputFail, index) {

          var condition = 'condition'; //replace
          var input = inputFail.$name;

          if (Object.keys(errorOne).length === 0) errorOne = {
            error: typeError,
            value: inputFail.$viewValue,
            message: yeValidFormMessage(typeError, inputFail.$name, inputFail.$viewValue, condition)
          };

          if ( angular.isUndefined(this[input]) ) this[input] = [];

          this[input].push({
            error: typeError,
            value: inputFail.$viewValue ,
            message: yeValidFormMessage(typeError, input, inputFail.$viewValue, condition)
          });

        }, errors);

      })

      return { status: false, errors: errors, errorOne: errorOne, message : "el formulario es incorrecto" };
    }

    return {status: true, message: 'El formulario es correcto'};

  };
}

function validFormMessage() {

  return function(errorName, field, valueFail, condition){
    var message = "";

    if     ( errorName === 'email')        message = valueFail + ': No tiene formato de email (' + field.toUpperCase() + ')';
    else if( errorName === 'max')           message = valueFail + ':  (' + field.toUpperCase() + ')';
    else if( errorName === 'maxlength')     message = valueFail + ':  Debe tener como maximo ' + condition +' (' + field.toUpperCase() + ')';
    else if( errorName === 'min')           message = valueFail + ':  (' + field.toUpperCase() + ')';
    else if( errorName === 'minlength')     message = valueFail + ':  Debe tener como minimo ' + condition +' (' + field.toUpperCase() + ')';
    else if( errorName === 'number')        message = valueFail + ': No es un número (' + field.toUpperCase() + ')';
    else if( errorName === 'pattern')       message = valueFail + ': No cumple con el patron requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'required')      message = field.toUpperCase() + ': Es obligatorio';
    else if( errorName === 'url')           message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'date')          message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'datetimelocal') message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'time')          message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'week')          message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';
    else if( errorName === 'month')         message = valueFail + ': No tiene el formato de fecha requerido (' + field.toUpperCase() + ')';

    //backend response (loopback)
    else if( errorName === 'presence')      message = field.toUpperCase() + ': Es obligatorio';
    else if( errorName === 'uniqueness')    message = field.toUpperCase() + ': Debe ser único';
    else message = valueFail + ': Es invalido (' + field.toUpperCase() + ')';
    console.log(errorName, field, valueFail, condition);
    return message;
  };

}

function validFormFields() {
  return function(form){
    var fields = getFieldsToForm(form);
  };
}

function getFieldsToForm (form) {

  //return _.map(form, function(value, field){
    //if ( !_.startsWith('$', field) ) return field.$name;
  //});

}
