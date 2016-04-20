(function() {
  console.log("I am in C3Report controller");
  'use strict';
  angular.module('dkApp')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('c3Report', {
        url: '/c3Report',
        templateUrl: 'lib/c3report/c3report.tpl.html',
        controller: 'c3ReportController',
        controllerAs: 'c3ReportCtrl'
      });
  }

  angular.module('dkApp')
    .controller('c3ReportController', C3ReportController);

  C3ReportController.$inject = [];

  function C3ReportController() {

    var vm = this;

    var isInteger = function(x) {
      return (typeof x === 'number') && (x % 1 === 0);
    };
    var yNumbers = [6, 4, 1];
    var maxY = d3.max(yNumbers);
    var formatNumberStr = function(value) {
      return value;
      //return isInteger(value) ? value : null;
    }

    var generateC3Report = function() {
      var chart = c3.generate({
        bindto: '#c3Chart',
        data: {
          columns: [
            ['Counter', 6, 4, 1]
          ],
          type: 'bar'
        },
        axis: {
          y: {
            label: {
              text: 'Only show integer',
              position: 'outer-middle'
            },
            tick: {
              values: d3.range(maxY + 1)
            }
          }
        }
      });
    }
    var myTimeFormatter = function(date) {
        moment.locale('es');
        return moment(date).format("DD MMM YY");
    };

    var generateDateReport = function() {
      var dateCategories = ["Date", "2016-03-01T00:00:00Z", "2016-03-02T00:00:00Z", "2016-03-03T00:00:00Z", "2016-03-04T00:00:00Z", "2016-03-05T00:00:00Z", "2016-03-06T00:00:00Z", "2016-03-07T00:00:00Z", "2016-03-08T00:00:00Z", "2016-03-09T00:00:00Z", "2016-03-10T00:00:00Z", "2016-03-11T00:00:00Z", "2016-03-12T00:00:00Z", "2016-03-13T00:00:00Z", "2016-03-14T00:00:00Z", "2016-03-15T00:00:00Z", "2016-03-16T00:00:00Z", "2016-03-17T00:00:00Z", "2016-03-18T00:00:00Z", "2016-03-19T00:00:00Z", "2016-03-20T00:00:00Z", "2016-03-21T00:00:00Z", "2016-03-22T00:00:00Z", "2016-03-23T00:00:00Z", "2016-03-24T00:00:00Z", "2016-03-25T00:00:00Z", "2016-03-26T00:00:00Z", "2016-03-27T00:00:00Z", "2016-03-28T00:00:00Z", "2016-03-29T00:00:00Z", "2016-03-30T00:00:00Z", "2016-03-31T00:00:00Z", "2016-04-01T00:00:00Z", "2016-04-02T00:00:00Z", "2016-04-03T00:00:00Z", "2016-04-04T00:00:00Z", "2016-04-05T00:00:00Z", "2016-04-06T00:00:00Z", "2016-04-07T00:00:00Z", "2016-04-08T00:00:00Z"];
      var dateData = ["Transactions", 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 9, 4, 0, 0, 0, 0, 0, 1, 15, 0, 0, 0, 0, 7, 8, 11, 4]
      var chart = c3.generate({
        bindto: '#dateChart',
        padding: {
          right: 20
        },
        size: {
          width: 880
        },
        data: {
          x: 'Date',
          xFormat: '%Y-%m-%dT%H:%M:%SZ',
          columns: [
            //['date', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06',  '2013-01-08', '2013-01-10', '2013-01-12'],
            dateCategories,
            dateData
          ],
          type: 'line'
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              // centered: false,
              count: (dateCategories.length > 11 ? 11 : null),
              format: myTimeFormatter,
              culling: {
                max: 12
              }
            }
          },
          y: {
            min: 0,
            padding: {
              bottom: 0 // ADDED
            }
          }
        },
        legend: {
          show: false
        }

      });
    }

    var generatePaddingChart = function() {
      var chart = c3.generate({
        bindto: '#paddingChart',
        data: {
          x: 'x',
          //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
          columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-08'],
            //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350]
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      });

      setTimeout(function() {
        chart.load({
          columns: [
            ['data3', 400, 500, 450, 700, 600, 500]
          ]
        });
      }, 1000);
    }

    var dataRows = [
      ['Value'],[1828],[828],[573],[542],[518],[486],[500],[620],[736],[538],[520],[560],[618],[631],[703],[829],[663],[712],[749],[857],[900],[950],[1116],[832],[686],[1036],[1601],[2026],[1335],[1131],[1779],[2327],[3029],[3247],[5855],[1311],[1080],[2406],[2461],[3583],[3677],[7049],[1276],[981],[2713],[961],[1]
    ];
    var dataR = ['Value',375,828,573,542,518,486,500,620,736,538,520,560,618,631,703,829,663,712,749,857,900,950,1116,832,686,1036,1601,2026,1335,1131,1779,2327,3029,3247,5855,1311,1080,2406,2461,3583,3677,7049,1276,981,2713,961,1];
    var dataCategories = ["01 Jan 2016",  "02 Jan 2016", "03 Jan 2016", "04 Jan 2016", "05 Jan 2016", "06 Jan 2016", "07 Jan 2016", "08 Jan 2016", "09 Jan 2016", "10 Jan 2016", "11 Jan 2016", "12 Jan 2016", "13 Jan 2016", "14 Jan 2016", "15 Jan 2016", "16 Jan 2016", "17 Jan 2016", "18 Jan 2016", "19 Jan 2016", "20 Jan 2016", "21 Jan 2016", "22 Jan 2016", "23 Jan 2016", "24 Jan 2016", "25 Jan 2016", "26 Jan 2016", "27 Jan 2016", "28 Jan 2016", "29 Jan 2016", "30 Jan 2016", "31 Jan 2016", "01 Feb 2016", "02 Feb 2016", "03 Feb 2016", "04 Feb 2016", "05 Feb 2016", "06 Feb 2016", "07 Feb 2016", "08 Feb 2016", "09 Feb 2016", "10 Feb 2016", "11 Feb 2016", "12 Feb 2016", "13 Feb 2016", "14 Feb 2016", "15 Feb 2016", "31 Mar 2016"];
    var simpleDataCategories = ["Date",  "03 Jan 2016",  "05 Jan 2016",  "13 Jan 2016", "15 Jan 2016", "20 Jan 2016", "25 Jan 2016", "26 Jan 2016",  "30 Jan 2016", "31 Jan 2016", "01 Feb 2016", "03 Feb 2016", "07 Feb 2016",  "10 Feb 2016", "15 Feb 2016", "31 Mar 2016"];
    var datas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'];
    var generateRowData = function() {
      var chart = c3.generate({
        bindto: '#rowData',
        size: {
          width: 880
        },
        padding: {
          right: 22
        },
        data: {
          rows: dataRows,
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category',
            categories: dataCategories,
            tick: {
              centered: true,
               count: 11
              // culling: {
              //   max: 10
              // }
              //values: simpleDataCategories
            }
          }
        },
        legend: {
          show: false
        }
      });
    }

    var generateColumnDataReport = function() {
      var chart = c3.generate({
        bindto: '#rowData',
        size: {
          width: 880
        },
        padding: {
          right: 22
        },
        data: {
          x: 'x',
          columns: [
              ["x", "01 Jan 2016",  "02 Jan 2016", "03 Jan 2016", "04 Jan 2016", "05 Jan 2016", "06 Jan 2016", "07 Jan 2016", "08 Jan 2016", "09 Jan 2016", "10 Jan 2016", "11 Jan 2016", "12 Jan 2016", "13 Jan 2016", "14 Jan 2016", "15 Jan 2016", "16 Jan 2016", "17 Jan 2016", "18 Jan 2016", "19 Jan 2016", "20 Jan 2016", "21 Jan 2016", "22 Jan 2016", "23 Jan 2016", "24 Jan 2016", "25 Jan 2016", "26 Jan 2016", "27 Jan 2016", "28 Jan 2016", "29 Jan 2016", "30 Jan 2016", "31 Jan 2016", "01 Feb 2016", "02 Feb 2016", "03 Feb 2016", "04 Feb 2016", "05 Feb 2016", "06 Feb 2016", "07 Feb 2016", "08 Feb 2016", "09 Feb 2016", "10 Feb 2016", "11 Feb 2016", "12 Feb 2016", "13 Feb 2016", "14 Feb 2016", "15 Feb 2016", "31 Mar 2016"],
              ['Value',828,573,542,518,486,500,620,736,538,520,560,618,631,703,829,663,712,749,857,900,950,1116,832,686,1036,1601,2026,1335,1131,1779,2327,3029,3247,5855,1311,1080,2406,2461,3583,3677,7049,1276,981,2713,961,1]
          ],
          type: 'line'
        },
        axis: {
          x: {
            // type: 'category',
            categories: dataCategories,
            tick: {
              centered: true,
               count: 11
              // culling: {
              //   max: 10
              // }
              //values: simpleDataCategories
            }
          }
        },
        legend: {
          show: false
        }
      });
    }

    var generateCategoryChart = function() {
      var chart = c3.generate({
        bindto: "#categoryChart",
        size: {
          width: 880
        },
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250, 30, 200, 100, 400, 150, 250, 50, 100, 250, 30, 200, 100, 400, 150, 250, 50, 100, 250]
          ],
          type: 'bar'
        },
        axis: {
          x: {
            type: 'category',
            tick: {
              count:11
              // centered: true,
              // culling: {
              //   max: 11
              // }
            },
            categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9','cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9','cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']
          }
        },
        legend: {
          show: false
        }
      });
    }

    var generateXCategoryChart = function() {
      var chart = c3.generate({
          bindto: "#categoryChart",
          size: {
            width: 880
          },
          data: {
              x : 'x',
              columns: [
                  ['x', 'www.site1.com', 'www.site2.com', 'www.site3.com', 'www.site4.com', 'www.site1.com', 'www.site2.com', 'www.site3.com', 'www.site4.com', 'www.site1.com', 'www.site2.com', 'www.site3.com', 'www.site4.com', 'www.site1.com', 'www.site2.com', 'www.site3.com', 'www.site4.com'],
                  ['download', 30, 200, 100, 400, 30, 200, 100, 400, 30, 200, 100, 400, 30, 200, 100, 400, 30, 200, 100, 400]
              ],

              type: 'bar'
          },
          axis: {
              x: {
                  type: 'category', // this needed to load string x value
                  tick: {
                    centered: true,
                    count: 11
                  }
              }
          },
          legend: {
            show: false
          }
      });
    }

    vm.init = function() {
      //generateC3Report();
      generateDateReport();
      //generatePaddingChart();
      // generateRowData();
      // generateColumnDataReport();
      // generateCategoryChart();
      // generateXCategoryChart();
    }

    vm.init();
  }

})();
