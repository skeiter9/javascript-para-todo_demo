'use strict';

function ctrl(
  $scope,
  $attrs,
  $q,
  $mdToast,
  $mdSidenav,
  $mdDialog,
  Empresa,
  UnidadMedida,
  Agregado,
  Almacen,
  yeFindBy,
  yeValidForm,
  yeValidFormMessage,
  apiConsamaUrlPhoto
  ) {

  var vm = this;

  vm.form = angular.isDefined(vm.item) ? vm.item : {};
  vm.cover = apiConsamaUrlPhoto('agregados', vm.item.photo, 'cover')
  vm.ui = {};

  checkInitAlmacenes();

  vm.toggleAsignations = function() {
    if (vm.showAsignation) {
      vm.start = true;

      var solved = $q.all([Empresa.find({filter: {include: 'almacenes'}})
        .$promise, UnidadMedida.find().$promise]);

      solved
        .then(function(result) {

          if (result[0].length === 0) {
            vm.ui.nonEmpresas = true;
            return $mdToast.showSimple('No hay empresas registradas');
          }

          var wAlmacanes = _.map(result[0], function(empresaR) {
            if (empresaR.almacenes.length > 0) return empresaR.almacenes;
          });

          if (wAlmacanes.length === 0) {
            vm.ui.nonAlmacenes = true;
            return $mdToast.showSimple('No hay almacenes registradas');
          }

          if (result[1].length === 0) {
            vm.ui.nonUms = true;
            return $mdToast.showSimple('No hay Unidades de medida registradas');
          }

          vm.form.almacenes = [];

          return vm.form.almacenes.push({});
        });

    }
  }

  vm.umsLoad = function(almacenIndex) {

    return avaibleUms(vm['ums' + almacenIndex]).then(function(newUms) {
      vm['ums' + almacenIndex] = newUms.ums;
    });

  };

  vm.empresasLoad = function() {

    return avaibleEmpresas(vm.empresas).then(function(newEmpresas) {
      vm.empresas = newEmpresas.empresas;
    });

  };

  vm.ui.addAlmacen = function(form, almacen) {

    var validForm = yeValidForm(form);
    if (!validForm.status) return $mdToast.showSimple(validForm.errorOne.message);

    vm.empresas = _.map(vm.empresas, function(empresa, index) {
      if (yeFindBy(empresa.almacenes, 'id', almacen.almacenId).index !== -1) {
        empresa.almacenes[yeFindBy(empresa.almacenes, 'id', almacen.almacenId).index].taken = true;
        almacen.disabled = true;
      }
      return empresa;
    });

    avaibleEmpresas(vm.empresas).then(function(newEmpresas) {
      vm.empresas = newEmpresas.empresas;
      if (newEmpresas.filled) return $mdToast.showSimple('Se asignaron todos los almacenes posibles');
      vm.form.almacenes.push({});
    });
  };

  vm.ui.chooseAlmacen = function(almacen) {
    if (angular.isString(almacen.almacenId)) {
      almacen.disabled = true;
      if (angular.isUndefined(almacen.precios)) almacen.precios = [];
      almacen.precios.push({});
    }
  }

  vm.ui.checkEmpresa = function(empresa, index) {
    var band = false;
    angular.forEach(empresa.almacenes, function(almacen, index) {
      if (angular.isUndefined(almacen.taken)) band = true;
    });
    return band;
  };

  vm.ui.filterUm = function(um, index) {
    if (um.taken) return false;
    return true;
  };

  vm.ui.savePrice = function(form, precios, precio, almacenIndex, enter) {
    //console.log(almacenIndex);
    //if (angular.isDefined(enter) && enter.keyCode !== 13) return false;

    var validForm = yeValidForm(form);
    if (!validForm.status) return $mdToast.showSimple(validForm.errorOne.message);

    vm['ums' + almacenIndex][yeFindBy(vm['ums' + almacenIndex], 'id', precio.unidadMedidaId).index].taken = true;
    precio.disabled = true;

    avaibleUms(vm['ums' + almacenIndex]).then(function(newUms) {
      vm['ums' + almacenIndex] = newUms.ums;
      if (newUms.filled) return $mdToast.showSimple('Se asignaron todos los precios posibles');
      precios.push({});
    });
  };

  vm.ui.removeAlmacen = function(almacenes, almacen) {
    if (almacenes.length === 1) return;

    if (angular.isDefined(almacen.almacenId)) {

      angular.forEach(vm.empresas, function(empresa, index) {
        angular.forEach(empresa.almacenes, function(almacenX, indexA) {
          if (almacenX.id === almacen.almacenId && almacenX.taken) {
            delete almacenX.taken;
          }
        });
      });
    }
    almacenes.splice(almacenes.indexOf(almacen), 1);
  };

  vm.ui.removePrice = function(precios, precio, almacenIndex) {
    if (precios.length === 1) return;

    if (angular.isDefined(precio.unidadMedidaId)) {
      delete vm['ums' + almacenIndex][yeFindBy(vm['ums' + almacenIndex], 'id', precio.unidadMedidaId).index].taken;
    }
    precios.splice(precios.indexOf(precio), 1);
  };

  vm.save = function(form) {
    if (angular.isDefined(vm.item)) form.$setDirty();
    var validForm = yeValidForm(form);
    if (!validForm.status) return $mdToast.showSimple(validForm.errorOne.message);

    Agregado
      .upsert(vm.form).$promise
        .then(function(agregado) {
          console.log(agregado, 'succes');
          $scope.$emit('successFormAgregado');
        }, function(err) {
          console.log(err, 'fail');
        });
  };

  //////////////////////////
  function avaibleUms(myUmsX) {
    var deferred = $q.defer();

    UnidadMedida.find().$promise
      .then(function(ums) {

        var myUms = myUmsX || [];

        var getUms = _.map(ums, function(um, index) {

          var umSearch = yeFindBy(myUms, 'id', um.id);
          if (umSearch.index !== -1 && umSearch.item.taken) um.taken = true;
          return um

        });

        var filled = true;

        angular.forEach(getUms, function(um, index) {
          if (angular.isUndefined(um.taken)) filled = false;
        });

        deferred.resolve({ums: getUms, filled: filled});

      }, function(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  function avaibleEmpresas(myEmpresasX) {
    var deferred = $q.defer();
    Empresa.find({filter: {include: 'almacenes'}}).$promise
      .then(function(empresas) {

        var myEmpresas = myEmpresasX || [];

        var getEmpresas = _.map(empresas, function(empresa, index) {
          if (empresa.almacenes.length > 0) {
            //console.log(myEmpresas, empresa.almacenes);
            angular.forEach(empresa.almacenes, function(almacen, indexA) {

              angular.forEach(myEmpresas, function(myEmpresa, indexE) {
                var almacenSearch = yeFindBy(myEmpresa.almacenes , 'id', almacen.id);
                if (almacenSearch.index !== -1 && almacenSearch.item.taken) empresa.almacenes[indexA].taken = true;

              });

            });

            return empresa;
          }

        });

        var filled = true;

        angular.forEach(getEmpresas, function(empresa, index) {
          angular.forEach(empresa.almacenes, function(almacen, index) {
            if (angular.isUndefined(almacen.taken)) filled = false;
          });
        });

        deferred.resolve({empresas: getEmpresas, filled: filled});

      }, function(err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  function checkInitAlmacenes() {

    Empresa.find({filter: {include: 'almacenes'}}).$promise
      .then(function(empresas) {

        if (empresas.length === 0) {
          vm.ui.nonEmpresas = true;
        }

        var wAlmacanes = [];
        for(var i = 0; i < empresas.length; i++) {
          if (empresas[i].almacenes.length > 0) wAlmacanes.push(empresas[i].almacenes);
        }

        if (wAlmacanes.length === 0) {
          vm.ui.nonAlmacenes = true;
        }
        return;
      });
  }

}


function agregadosForm() {
  return {
    scope: {
      item: '=',
      newUm: '&'
    },
    restrict: 'E',
    template: require('./templates/agregados-form.jade'),
    controller: ctrl,
    controllerAs: 'afVm',
    bindToController: true
  }
}

var agregadosForm = require('angular')
  .module('appAgregadosForm', [])
  .directive('agregadosForm', agregadosForm);

module.exports = agregadosForm;
