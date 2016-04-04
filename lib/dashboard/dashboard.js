(function(){
  console.log("I am in dashboard");
    'use strict';
    angular.module('dkApp')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'lib/dashboard/dashboard.tpl.html',
                controller: 'dashboardController',
                controllerAs: 'dashboardCtrl'
            });
    }

    angular.module('dkApp')
        .controller('dashboardController', DashboardController);

    DashboardController.$inject = [];

      function DashboardController() {
        var vm = this;
        vm.userName = 'Dekai';

        // var init = function() {};
        //
        // init();
      }

})();
