class templateNoidungTextController {
    constructor($scope, $element, $messageBox) {
        this.element = $element;
        
    }
    $onInit() {
        //console.log(this);
        this.data.changed = false;
        this.initCallback({c:this});
    }
    remove() {
        this.element.remove();
    }
    txtContentChanged() {
        this.data.changed = true;
    }
    autosize() {
        var el = this.element.find('textarea');
        setTimeout(function () {
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }
}