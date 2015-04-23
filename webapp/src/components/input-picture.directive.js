'use strict';

require('angular-file-upload');
require('./styles/input-figure.directive.styl');

function inputPicture() {

  return {
    scope: {
      cover: '=',
      storage: '@',
      photo: '='
    },
    restrict: 'EA',
    controller: ctrl,
    bindToController: true,
    template: require('./templates/input-figure.directive.jade'),
    controllerAs: 'inputFigure'
  };

}

function ctrl($scope, $element, $log, FileUploader, $mdToast, $translate){
  var vm = this;
  vm.spinner = {show: false};
  //var tmpName = (vm.photo === '') ? vm.storage + '-' + Date.now().toString() : vm.photo.substring(0, vm.photo.lastIndexOf('.'));
  var tmpName = vm.storage + '-' + Date.now().toString();

  vm.uploader = new FileUploader({
    url: 'http://localhost:3000/api/pictures/temp/upload',
    autoUpload: true,
    withCredentials: true,
    isHTML5: true,
    removeAfterUpload: true,
    filters: [],
    formData: {
      fields: {
        storage: tmpName
      }
    }
  });

  vm.uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/, options) {
      var type = item.type.slice(item.type.lastIndexOf('/') + 1);
      if (/(jpg|png|jpeg|bmp|gif)/.test(type)) return true;
      else {
        $translate('ACCEPTED_IMAGES')
          .then(function(message) {
            $mdToast.showSimple(message);
          }, function(message) {
            $log.debug('translate not avaible for ' + message);
          });
        return false;
      }

    }
  });
  /*
  vm.uploader.filters.push({
    name: 'changePicture',
    fn: function(item) {
      vm.uploader.clearQueue();
      return true;
    }
  });*/

  vm.uploader.onBeforeUploadItem = function(item){
    console.log('launch spinner');
    vm.spinner.show = true;
  };

  vm.uploader.onProgressItem = function(item, progress) {
    console.debug(progress);
    vm.spinner.percent = progress;
  };

  vm.uploader.onErrorItem = function(item, response, status, headers){
    $element[0].querySelector('.drop').classList.remove('success');
    $element[0].querySelector('.drop').className += ' error';
    console.log(response);
    $mdToast.showSimple('Hubo un error al subir la imagen');
    showThumb(item._file);
  };

  vm.uploader.onSuccessItem = function(item, response, status, headers){
    $element[0].querySelector('.drop').classList.remove('error');
    $element[0].querySelector('.drop').className += ' success';
    if (angular.isDefined(item)) showThumb(item._file);
    vm.photo = response.result.files.file[0].name;
    return;
  };

  //////////////////
  function showThumb(picture){
    var reader = new FileReader();
    reader.onload = function() {
      $scope.$apply(function() {
        vm.spinner.show = false;
        vm.cover = reader.result;
      });
    };
    reader.readAsDataURL(picture);
  }
}

var inputFigureModule = angular
  .module('components.inputFigure', [
    'angularFileUpload'
  ])
  .directive('inputPicture', inputPicture);

module.exports = inputFigureModule;
