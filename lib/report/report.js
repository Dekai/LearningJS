(function(){
  console.log("I am in report controller");
    'use strict';
    angular.module('dkApp')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('report', {
                url: '/report',
                templateUrl: 'lib/report/report.tpl.html',
                controller: 'reportController',
                controllerAs: 'reportCtrl'
            });
    }

    angular.module('dkApp')
        .controller('reportController', ReportController);

    ReportController.$inject = [];

      function ReportController() {
        var vm = this;
        vm.donutPoints = [{
          "data1": 70,
          "data2": 30,
          "data3": 50,
          "data4": 40,
          "data5": 10
        }];
        vm.donutColumns = [{
          "id": "data1",
          "type": "donut"
        }, {
          "id": "data2",
          "type": "donut"
        }, {
          "id": "data3",
          "type": "donut"
        }, {
          "id": "data4",
          "type": "donut"
        }, {
          "id": "data5",
          "type": "donut"
        }];

        vm.clickedData;

        vm.dkClick = function(obj) {
          alert(obj);
        };

        vm.showClick = function(data) {
          vm.clickedData = 'clicked on data ' + data.id;
        };

        vm.clickLegend = function(data) {
          vm.clickedData = data;
        };

        // var init = function() {};
        //
        // init();
      }

})();
