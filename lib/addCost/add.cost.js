(function() {
  console.log("I am in dashboard");
  'use strict';
  angular.module('dkApp')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('addCost', {
        url: '/add_cost',
        templateUrl: 'lib/addCost/add.cost.tpl.html',
        controller: 'addCostController',
        controllerAs: 'addCostCtrl'
      });
  }

  angular.module('dkApp')
    .controller('addCostController', AddCostController);

  AddCostController.$inject = [];

  function AddCostController() {
    var vm = this;
    vm.costTypes = ['House Rent', 'Child Care', 'Phone Bill', 'Super Market'];
  }

})();
