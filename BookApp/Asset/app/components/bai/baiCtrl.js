class baiController {
    constructor($scope, $element, $compile, $messageBox) {
        this.$scope = $scope;
        this.$element = $element;
        this.$compile = $compile;
        this.$messageBox = $messageBox;
        this.displayMode = 'preview';
        this.isHeaderMemuShow = false;
        this.childCompTemplateNoidung = [];
        this.dsTemplateNoidungDebai = [];
        //Child elements
        this.btnSave = $element.find('div[name="btnSave"]').first();
        
        //Binding
        this.switchEditMode = this.switchEditMode.bind(this);
        this.deleteBai = this.deleteBai.bind(this);
        this.cloneBai = this.cloneBai.bind(this);
        this.resetBai = this.resetBai.bind(this);

        this.menuCommands = {
            deleteBai: {
                display: 'Xoa bai',
                action: this.deleteBai
            },
            editBai: {
                display: 'Edit',
                action: this.switchEditMode
            },
            resetBai: {
                display: 'Reset',
                action: this.resetBai
            },
            cloneBai: {
                display: 'Sao chep bai',
                action: this.cloneBai
            }
        };
    }
    $onInit() {
        this.displayMode = this.data.dbState ? 'preview' : 'edit';
        this.data.dbData.ds_templatenoidungdebai.forEach(nd => {
            this.dsTemplateNoidungDebai.push({
                dbState: true,
                dbData: nd
            });
        });
    }
    childCpnAdded(c) {
        this.childCompTemplateNoidung.push(c);
    }
    insertBai() {
        //console.log(this.dsTemplateNoidungDebai);
        var baiToInsert = {
            bai_id
        }
        return;
        $.ajax({
            type: "POST",
            url: '../api/interface/InsertBai',
            data: JSON.stringify(data),
            contentType: "application/json;charset=utf-8",
            processData: true,
            success: function (data, status, xhr) {
                alert("The result is : " + status);
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    }
    updateTemplateNoidungBai(data) {

    }
    deleteBai() {
        var self = this;
        this.$messageBox.open({
            type: 'delete',
            title: 'Delete bai',
            message: 'Delete bai ?'
        },
        function () {
            self.$element.remove();
        },
        function () {
        });
    }
    switchEditMode() {
        this.displayMode = 'edit';
    }
    resetBai() {
        console.log(this.data.ds_templatenoidungdebai);
    }
    cloneBai() {
        this.childCompTemplateNoidung[0].displaymode = 'edit';
    }

    //----------Event functions-----------
    btnSaveClick() {
        if (this.data.dbState === true) {
            //this.updateTemplateNoidungBai();
            console.log('update template noidung');
        }
        else {
            this.insertBai();
            //console.log('insert bai\n--Insert templatenoidung\n--InsertCauhoi');
        }
        this.childCompTemplateNoidung.forEach(function (item) {
            item.data.changed = false;
        });
        this.displayMode = 'preview';
    }
    btnMenuClick(e) {
        window.currentBaiElem = this.$element;
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
    mnuThemNoidungDebaiTextClick() {
        this.dsTemplateNoidungDebai.push({
            dbState: false,
            dbData: {
                "loai_template": "TEXT",
                "template_noidung_text": {
                    "noi_dung": "",
                    "ckeditor_format": null,
                    "template_width": null,
                    "template_height": null,
                    "template_aligment": null
                },
                "template_noidung_hinhanh": null
            }
        });
    }
}

//function baiController($scope, $element, $compile, $messageBox) {
//    var self = this;
//    var btnSave = $element.find('div[name="btnSave"]').first();
//    this.displayMode = 'preview';
//    this.isHeaderMemuShow = false;
    
    
//    this.$onInit = function () {
//        btnSave.hide();
//    }
    
//    //----------Event functions
//    this.menuCommands = {
//        deleteBai: {
//            display: 'Xoa bai',
//            action: function () {
//                $messageBox.open({
//                    type: 'delete',
//                    title: 'Delete bai',
//                    message: 'Delete bai ?'
//                },
//                function () {
//                    $element.remove();
//                },
//                function () {
//                });
//            }
//        },
//        editBai: {
//            display: 'Edit',
//            action: function () {
//                self.displayMode = 'edit';
//                btnSave.show();
//            }
//        },
//        resetBai: {
//            display: 'Reset',
//            action: function () {
//                console.log('reset bai');
//            }
//        },
//        cloneBai: {
//            display: 'Sao chep bai',
//            action: function myfunction() {
//                console.log('clone bai');
//            }
//        }
//    };
//    this.btnSaveClick = function () {
//        this.displayMode = 'preview';
//        btnSave.hide();
//    }
//    this.btnMenuClick = function (e) {
//        window.currentBaiElem = $element;
//        if (!window.currentBaiCtrl) {
//            window.currentBaiCtrl = this;
//            this.isHeaderMemuShow = true;
//        }
//        else if (window.currentBaiCtrl == this) {
//            this.isHeaderMemuShow = !this.isHeaderMemuShow;
//        }
//        else {
//            window.currentBaiCtrl.isHeaderMemuShow = false;
//            //window.currentBaiCtrl.headerMenuVisible(false);
            
//            window.currentBaiCtrl = this;
//            this.isHeaderMemuShow = !this.isHeaderMemuShow;
//        }
//    }
//    //----------Utility functions----------
//    this.deleteNoidungdebai = function () {

//    }
//    this.saveNoidungdebai = function () {

//    }
//}
