(function() {
  console.log("I am in D3 controller");
  'use strict';
  angular.module('dkApp').config(routeConfig);
  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('d3Report', {
        url: '/d3Report',
        templateUrl: 'lib/d3report/d3report.tpl.html',
        controller: 'd3ReportController',
        controllerAs: 'd3ReportCtrl'
      });
  }

  angular.module('dkApp')
    .controller('d3ReportController', D3ReportController);

  D3ReportController.$inject = [];

  function D3ReportController() {
    var vm = this;

    var generateD3BarChart = function() {

      var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

      var svg = d3.select("#d3Bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("data.tsv", type, function(error, data) {
          if (error) throw error;

          x.domain(data.map(function(d) { return d.letter; }));
          y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Frequency");

          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.letter); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); });
        });

    }

    var generateBarChart = function() {
      var chartdata = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
      135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410];

      var margin = {top: 30, right: 10, bottom: 30, left: 50}

      var height = 400 - margin.top - margin.bottom,
          width = 720 - margin.left - margin.right,
          barWidth = 40,
          barOffset = 20;

      var dynamicColor;

      var yScale = d3.scale.linear()
          .domain([0, d3.max(chartdata)])
          .range([0, height])

      var xScale = d3.scale.ordinal()
          .domain(d3.range(0, chartdata.length))
          .rangeBands([0, width])

      var colors = d3.scale.linear()
          .domain([0, chartdata.length * .33, chartdata.length * .66, chartdata.length])
          .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

      var awesome = d3.select('#bar-chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .style('background', '#bce8f1')
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
          .selectAll('rect').data(chartdata)
          .enter().append('rect')
          .style({
              'fill': function (data, i) {
                  return colors(i);
              }, 'stroke': '#31708f', 'stroke-width': '5'
          })
          .attr('width', xScale.rangeBand())
          .attr('x', function (data, i) {
              return xScale(i);
          })
          .attr('height', 0)
          .attr('y', height)
          .on('mouseover', function (data) {
              dynamicColor = this.style.fill;
              d3.select(this)
                  .style('fill', '#3c763d')
          })

          .on('mouseout', function (data) {
              d3.select(this)
                  .style('fill', dynamicColor)
          })

      awesome.transition()
          .attr('height', function (data) {
              return yScale(data);
          })
          .attr('y', function (data) {
              return height - yScale(data);
          })
          .delay(function (data, i) {
              return i * 20;
          })
          .duration(2000)
          .ease('elastic')

      var verticalGuideScale = d3.scale.linear()
          .domain([0, d3.max(chartdata)])
          .range([height, 0])

      var vAxis = d3.svg.axis()
          .scale(verticalGuideScale)
          .orient('left')
          .ticks(10)

      var verticalGuide = d3.select('#bar-chart svg').append('g')
      vAxis(verticalGuide)
      verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
      verticalGuide.selectAll('path')
          .style({fill: 'none', stroke: "#3c763d"})
      verticalGuide.selectAll('line')
          .style({stroke: "#3c763d"})

      var hAxis = d3.svg.axis()
          .scale(xScale)
          .orient('bottom')
          .ticks(chartdata.size)

      var horizontalGuide = d3.select('#bar-chart svg').append('g')
      hAxis(horizontalGuide)
      horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
      horizontalGuide.selectAll('path')
          .style({fill: 'none', stroke: "#3c763d"})
      horizontalGuide.selectAll('line')
          .style({stroke: "#3c763d"});
    }

    var generateLineChart = function() {
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var svg = d3.select("#lineChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("data2.tsv", type2, function(error, data) {
          if (error) throw error;

          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain(d3.extent(data, function(d) { return d.close; }));

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price ($)");

          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);
        });
    }

          var tryTransition = function() {
            d3.select('#d3Bar').transition()
                .delay(8750)
                .each("start", function() { d3.select(this).style("background", "green");})
                .style("background","red");
          }

          var tryStyleTween = function() {
            d3.select("#d3Bar").transition()
              .styleTween("background", function() { return d3.interpolate("red", "yellow");});
    }

    vm.init = function() {
      generateD3BarChart();
      tryTransition();
      setTimeout(tryStyleTween(), 18000);
      generateBarChart();
      generateLineChart();
    }

    vm.init();
  }

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }

  function type2(d) {
    var formatDate = d3.time.format("%d-%b-%y");
    d.date = formatDate.parse(d.date);
    d.close = +d.close;
    return d;
  }

})();
