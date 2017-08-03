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
            //$scope.danhSachBai = data;
            data.forEach(bai => {
                $scope.danhSachBai.push({
                    dbState: true,
                    dbData:bai
                });
            });
            $scope.$apply();
        });
    };
    $scope.btnThemBaiClicked = function () {
        $scope.danhSachBai.push({
            dbState:false,
            dbData: {
                "id_bai": 3,
                "id_chuyende": 3,
                "ngay_tao": new Date().toISOString(),
                "thu_tu": 1,
                "bai_mau": false,
                "xuat_ban": false,
                "ds_templatenoidungdebai": [],
                "ds_cauhoi": []
            }
        });
    }
    init();
}]);