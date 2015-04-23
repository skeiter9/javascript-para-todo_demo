'use strict';
/*
red
purple
deep-purple
indigo
blue
light-blue
light-green
teal
green
cyan
lime
pink
yellow
amber
orange
deep-orange
brown
grey
blue-grey
*/
function themes(mdThemingProvider) {

  mdThemingProvider
    .theme('default')
      .primaryPalette('teal')
      .accentPalette('orange')
      .backgroundPalette('grey');

  mdThemingProvider
    .theme('comics')
      .primaryPalette('brown')
      .accentPalette('cyan')

  mdThemingProvider
    .theme('fleet')
      .primaryPalette('amber')

}

module.exports = themes;
