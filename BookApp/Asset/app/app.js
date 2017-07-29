$(function () {
    $(document).on('click', function (e) {
        
        var selected = $(e.target).closest('.box-header-button.menu');
        if (selected.length == 0 && window.currentBaiCtrl && window.currentBaiElem && window.currentBaiElem.scope()) {
            window.currentBaiCtrl.isHeaderMemuShow = false;
            window.currentBaiElem.scope().$apply();
        }
    });
})