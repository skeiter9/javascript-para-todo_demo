'use strict';

function layoutDataService($translate) {

  this.languages = {
    preferred: 'es',
    avaibles: ['es', 'en']
  };

  this.appbar = {
    title: 'consama'
  };

  this.sidenav = {
    right: {
      toolbar: {
        title: 'sidenav right title'
      },
      content: {
        html: '<md-subheader> content for Sidenav right </md-subheader>'
      }
    }
  };

  this.modules = {
    comics: {
      icon: 'book'
    }
  }

  this.ui = {
    card: {
      showContent: true
    },
    list: {
      type: 'list'
    }
  }

}

var layoutData = require('angular')
  .module('layoutData', [])
  .service('layoutData', layoutDataService)

module.exports = layoutData;
