(function() {
  'use strict';
  console.log('I am in app');
  var dkApp = angular.module('dkApp', [
    'ui.router',
    'gridshore.c3js.chart',
    'ngMaterial',
    'gettext'
  ]);
})();

// app-config
(function() {
  'use strict';
  console.log('I am in config');
  var dkApp = angular.module('dkApp')
    .config(defaultRouteConfig);

  dkApp.run(function(gettextCatalog) {
    gettextCatalog.debug = true;
    gettextCatalog.setCurrentLanguage('es_CO');
  });

  dkApp.run(['$rootScope', 'gettextCatalog', function($rootScope, gettextCatalog) {
    // Language switcher
    $rootScope.languages = {
      current: gettextCatalog.currentLanguage,
      available: {
        'es_CO': 'Colombia',
        'en': 'English'
      }
    };

    $rootScope.gettextCatalogInstance = gettextCatalog;

    $rootScope.$watch('languages.current', function(lang) {
      if (!lang) {
        return;
      }

      $rootScope.gettextCatalogInstance.setCurrentLanguage(lang);
    });
}]);


  defaultRouteConfig.$inject = ['$urlRouterProvider'];

  function defaultRouteConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
  }
})();
