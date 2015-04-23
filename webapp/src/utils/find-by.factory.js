'use strict';

function findBy(){

  return function findByField(collection, searchKey, searchValue) {
    var result;
    var searchValueIndex = -1;

    angular.forEach(collection, function(value, index) {
      if (value[searchKey] == searchValue) {
        result = value;
        searchValueIndex = index;
      };
    });

    return {item: result, index: searchValueIndex};
  };

}

var findByModule = require('angular')
  .module('appUtilsFindBy', [])
  .factory('yeFindBy', findBy);

module.exports = findByModule;
