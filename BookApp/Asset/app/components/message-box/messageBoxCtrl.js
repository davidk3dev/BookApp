function messageBoxController($scope, $element) {
    window.msgBox = {
        element: $element,
        controller: this
    };
    this.title = '';
    this.message = '';
    this.isOpen = false;
    this.btnOK = { visible: 'false', element: $element.find('#msgb_btnOK') };
    this.btnSave = { visible: 'false', element: $element.find('#msgb_btnSave') };
    this.btndDelete = { visible: 'false', element: $element.find('#msgb_btnDelete') };
    this.btnCancel = { visible: 'false', element: $element.find('#msgb_btnCancel') };
    this.$onInit = function () {
        $element.find('.message-box-dialog').draggable({ handle: '.header' });
    }
    this.show = function (options, okCallBack, cancelCallback) {
        this.type = options.type;
        this.title = options.title;
        this.message = options.message;
        switch (this.type) {
            case 'save': this.messageBoxSave(okCallBack, cancelCallback); break;
            case 'delete': this.messageBoxDelete(okCallBack, cancelCallback); break;
            case 'info': this.messageBoxInfo(okCallBack); break;
            default: alert('invalid messagebox type'); break;
        }
        if (cancelCallback) {
            var self = this;
            this.btnCancel.element.off().on('click', function () {
                cancelCallback();
                self.close();
            });
        }
        this.open();
    }
    this.messageBoxInfo = function (okCallBack) {
        var self = this;
        this.hideAllButtons();
        this.btnOK.visible = true;
        this.btnOK.element.off().on('click', function () {
            okCallBack();
            self.close();
        });
    }
    this.messageBoxSave = function (okCallBack) {
        var self = this;
        this.hideAllButtons();
        this.btnSave.visible = true;
        this.btnCancel.visible = true;
        this.btnSave.element.off().on('click', function () {
            okCallBack();
            self.close();
        });
    }
    this.messageBoxDelete = function (okCallBack) {
        var self = this;
        this.hideAllButtons();
        this.btndDelete.visible = true;
        this.btnCancel.visible = true;
        this.btndDelete.element.off().on('click', function () {
            self.close();
            okCallBack();
            console.log('callbeck finished');
        });
    }
    this.hideAllButtons = function(){
        this.btnOK.visible = false;
        this.btnSave.visible = false;
        this.btndDelete.visible = false;
        this.btnCancel.visible = false;
    }
    this.open = function () {
        this.isOpen = true;
    }
    this.close = function () {
        this.isOpen = false;
        $scope.$apply();
    }
}