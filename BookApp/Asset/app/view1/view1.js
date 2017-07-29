'use strict';

angular.module('bookapp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: '../asset/app/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$compile', function ($scope, $compile) {
    $scope.danhSachBai = [];
    var init = function () {
        $.get("../api/interface/GetBaiByChuyenDe?id_chuyende=3", function (data) {
            $scope.danhSachBai = data;
            $scope.$apply();
        });
    };
    init();
}]);