/**
 *
 * @author
 *
 */
var Rizhi = (function (_super) {
    __extends(Rizhi, _super);
    function Rizhi() {
        _super.call(this);
        this.tf = null;
        this.init();
    }
    var d = __define,c=Rizhi,p=c.prototype;
    p.init = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xcccccc);
        bg.graphics.drawRect(0, 0, Global.STAGE_WIDTH, 50);
        bg.graphics.endFill();
        this.addChild(bg);
        this.tf = new egret.TextField();
        this.addChild(this.tf);
        this.tf.textColor = 0;
        this.tf.size = 15;
        this.tf.y = 20;
    };
    p.update = function (str) {
        this.tf.text += str;
    };
    p.clear = function () {
        this.tf.text = "";
    };
    return Rizhi;
})(egret.DisplayObjectContainer);
egret.registerClass(Rizhi,'Rizhi');
//# sourceMappingURL=Rizhi.js.map