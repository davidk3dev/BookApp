'use strict';

// Declare app level module which depends on views, and components
angular.module('bookapp', [
  'ngRoute',
  'bookapp.view1',
  'bookapp.view2'
])
.component('bai', {
    bindings: {
        data: '<'
    },
    templateUrl: '../asset/app/components/bai/baiTmpt.html',
    controller: baiController
})
.component('baiEditor', {
    bindings: {
        data: '<'
    },
    templateUrl: '../asset/app/components/bai/baiEditorTmpt.html',
    controller: baiEditorController
})
.component('boxHeaderMenu', {
    bindings: {
        data: '<'
    },
    templateUrl: '../asset/app/components/box-header-menu/boxHeaderMenuTmpt.html',
    controller: boxHeaderMenuController
})
.component('messageBox', {
    templateUrl: '../asset/app/components/message-box/messageBoxTmpt.html',
    controller: messageBoxController
})
.component('templatenoidungText', {
    bindings: {
        data: '<'
    },
    templateUrl: '../asset/app/components/template-noidung/templateNoidungTextTmpt.html',
    controller: templateNoidungTextController
})
.factory('$messageBox', ['$compile', '$rootScope', function ($compile, $rootScope) {
    return {
        open: function (option, fnOK, fnCancel) {
            //var newScope = $rootScope.$new(true, $rootScope);
            //newScope.abc = 'sdfsdfsd';
            //var msg = $('<message-box id="messageBox"></message-box>');
            //$('body').append($compile(msg)(newScope));
            window.msgBox.controller.show(option, fnOK, fnCancel);
        }
    };
}])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({ redirectTo: '/view1' });
}]);
