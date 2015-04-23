'use strict';

function $stateNotFound(event, unfoundState, fromState, fromParams) {
  //console.log(unfoundState.to); // "lazy.state"
  //console.log(unfoundState.toParams); // {a:1, b:2}
  //console.log(unfoundState.options); // {inherit:false} + default options
  //event.preventDefault();
  //$state.go('404');
}

function $locationChangeStart(event, toState, b, fromState, d) {
  //console.log(toState, b, fromState, d);
  if (toState.auth) {
    console.log('check token');
  }
}

function getLanguage(lang, languages) {
  var index = languages.indexOf(lang);
  if(index !== -1) return lang;

  var indexAux = lang.indexOf('-');
  var auxLanguage = ( indexAux !== -1) ? lang.substring(0, indexAux) : lang.substring(0, lang.length);

  var index = languages.indexOf(auxLanguage);
  if(index !== -1) return auxLanguage;

  return 'en';
}

function getNavigatorLanguage() {
  return $window.navigator.language || $window.navigator.languages[0];
}

function layoutRun($rootScope, $state, $translate, $window, layoutData, tmhDynamicLocale) {
  var userLanguage = getLanguage(layoutData.languages.preferred || getNavigatorLanguage(), layoutData.languages.avaibles);
  $translate.use(userLanguage);//PUT WHEN THE APP IS READY
  //tmhDynamicLocale.set(userLanguage);

  //$rootScope.$on('$stateNotFound', $stateNotFound);
  //$rootScope.$on('$stateChangeStart', $locationChangeStart);
}

module.exports = layoutRun;
