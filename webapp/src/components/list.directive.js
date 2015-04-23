'use strict';

var $timeout_;
var $animate_;
var $controller_;
var $mdSidenav_;
var $translate_;
var apiConsamaUrlPhoto_;
var yeFindBy_;
var layoutData_;

function checkForScrool(tableWidth, widthContainer) {
  return (tableWidth > widthContainer) ? 'ox-s' : '';
}

function ComponentsListController($http, apiConsama, listFormate, apiConsamaUrlPhoto, layoutData) {

  var list = this;
  var data = {
    list :[
      {id: 'id'},
      {name: 'title'},
      {photo: 'photo'},
      {description: 'description'}
    ],
    table: [
      {id: 'id'},
      {photo: 'photo'},
      {name: 'name'},
      {description: 'description'}
    ]
  };
  //if read is true get list
  $http({
    method: 'get',
    url: apiConsama.url + '/' + list.module.pluralName
  })
    .then(function(response) {
      list.items = listFormate(response.data, data);
    }, function(response) {
      console.log(response);
    });

  list.layoutData = layoutData;
  list.getPhoto = function(pic, type) { return apiConsamaUrlPhoto(list.module.pluralName, pic, type)};

}

function preLink(scope, elem, attrs, list) {
  elem.addClass('d-b p-r');
  list.linesClass = 'md-' + (attrs.lines || 2) + '-line';
  list.widthContainer = elem[0].offsetWidth;
}

function postLink(scope, elem, attrs, list, transclude) {

  scope.action = action;

  var auxTimeout2;

  var watchDataListType = scope.$watch(function() {return list.layoutData.ui[list.module.pluralName].listType},
    function(type) {

      scope.typeList = type;

      var dataListTypeShow = elem.find((type === 'table') ? 'table' : 'md-list');
      var dataListTypeHide = elem.find((type !== 'table') ? 'table' : 'md-list');

      auxTimeout2 = $timeout_(function() {

        elem
          .removeClass((type !== 'table') ? 'ox-s' : 'ox-h')
          .addClass((type === 'table') ? checkForScrool(elem[0].querySelector('table').scrollWidth, scope.widthContainer) : 'ox-h');

        dataListTypeHide.addClass('p-a');
        dataListTypeShow.removeClass('p-a');

        $animate_.addClass(dataListTypeHide, 'fx-fade-left')
          .then(function() {
            $animate_.removeClass(dataListTypeShow, 'fx-fade-right');
          });

      }, 0);
    });

  function action(typeView, item) {

    transclude(scope, function(clone, scopeT) {
      scopeT.itemSelected = yeFindBy_(scopeT.items.original, 'id', item.id).item;

      var layout = $controller_('LayoutController');

      layoutData_.sidenav.right.toolbar.title = yeFindBy_(scopeT.items.list, 'id', item.id).item.title;
      layout.sidenavRightContentChange(((typeView === 'show') ? clone[0] : clone[1]), scopeT);
      layout.sidenavOpen('right');

      scope.$on('successFormAgregado', function(evt) {
        layout.sidenavClose('right');
      });
    });

  }

  scope.$on('$destroy', function() {
    watchDataListType();
    $timeout_.cancel(auxTimeout2);
    console.debug('destroy list' + scope.title);
  });

}

function mdxList($timeout,
  $animate,
  $controller,
  $mdSidenav,
  apiConsamaUrlPhoto,
  yeFindBy,
  layoutData,
  $translate
  ) {

  $timeout_ = $timeout;
  $animate_ = $animate;
  $controller_ = $controller;
  $mdSidenav_ = $mdSidenav;
  yeFindBy_ = yeFindBy;
  layoutData_ = layoutData;
  $translate_ = $translate;
  apiConsamaUrlPhoto_ = apiConsamaUrlPhoto;

  return {
    scope: {
      module: '='
    },
    //require: '?^mdCardToggle',
    bindToController: true,
    controller: 'ComponentsListController',
    controllerAs: 'list',
    restrict: 'E',
    transclude: true,
    template: require('./templates/list'),
    link: {
      pre: preLink,
      post: postLink
    }
  };

}

module.exports = require('angular')
  .module('componentsList', [])
  .controller('ComponentsListController', ComponentsListController)
  .directive('mdxList', mdxList);
