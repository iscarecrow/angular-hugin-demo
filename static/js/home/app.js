'use strict';
angular.module('huginApp', [
    'ngRoute'
  ])
  .config(['$compileProvider', '$routeProvider', '$locationProvider',
    function($compileProvider, $routeProvider, $locationProvider) {
      $routeProvider 
        .when('/detail/', {
          templateUrl: '../static/js/home/home_detail.html',
          controller: 'homeDetailCtrl',
          reloadOnSearch: false
        })
        .when('/list/', {
          templateUrl: '../static/js/home/home_list.html',
          controller: 'homeListCtrl',
          reloadOnSearch: false
        })
        .otherwise({
          redirectTo: '/detail/'
        });
    }
  ])