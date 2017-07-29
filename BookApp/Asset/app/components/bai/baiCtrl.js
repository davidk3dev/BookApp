function baiController($scope, $element, $compile, $messageBox) {
    this.isEditMode = 'preview';
    this.menuCommands = {
        deleteBai: {
            display: 'Xoa bai',
            action: function () {
                $messageBox.open({
                    type: 'delete',
                    title: 'Delete bai',
                    message: 'Delete bai ?'
                },
                function () {
                    $element.remove();
                },
                function () {
                });
            }
        },
        resetBai: {
            display: 'Reset',
            action: function () {
                console.log('reset bai');
            }
        },
        cloneBai: {
            display: 'Sao chep bai',
            action: function myfunction() {
                console.log('clone bai');
            }
        }
    };
    this.isHeaderMemuShow = false;
    this.$onInit = function () {
        this.content = this.data;
    }
    this.btnEditClick = function () {
        this.isEditMode = (this.isEditMode == 'edit') ? 'preview' : 'edit';
    }
    this.btnMenuClick = function (e) {
        window.currentBaiElem = $element;
        if (!window.currentBaiCtrl) {
            window.currentBaiCtrl = this;
            this.isHeaderMemuShow = true;
        }
        else if (window.currentBaiCtrl == this) {
            this.isHeaderMemuShow = !this.isHeaderMemuShow;
        }
        else {
            window.currentBaiCtrl.isHeaderMemuShow = false;
            //window.currentBaiCtrl.headerMenuVisible(false);
            
            window.currentBaiCtrl = this;
            this.isHeaderMemuShow = !this.isHeaderMemuShow;
        }
    }
}
function baiEditorController() {

}