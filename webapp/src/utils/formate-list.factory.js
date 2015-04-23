'use strict';

function parseObject(row, data) {

  var listItemDefault = ['title', 'subtitle', 'description', 'photo']
  var item = {};

  angular.forEach(row, function(valueField, field) {

    angular.forEach(data, function(dataRow, dataIndex) {

      if (dataRow.hasOwnProperty(field)) {

        if (angular.isFunction(dataRow.value)) this[ dataRow[field] ] = dataRow.value(valueField) ;
        else this[ dataRow[field] ] = valueField ;

      }

    }, item);

  });

  return item;

}

function listFormateType(rows, formatePattern) {

  var items = [];

  if (angular.isArray(rows)) {

    angular.forEach(rows, function(value, index) {

      items.push(parseObject(value, formatePattern));

    });

    return items;

  } else if (angular.isObject(rows)) {
    return parseObject(rows, formatePattern);
  }

}

function listFormate() {

  return function (items, pattern) {
    return {
      original: items,
      list: listFormateType(items, pattern.list),
      table: listFormateType(items, pattern.table)
    };
  }
}

var formateList = require('angular')
  .module('utilsFormateList', [])
  .factory('listFormate', listFormate)

module.exports = formateList;
