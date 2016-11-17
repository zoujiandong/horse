/**
 * 倒计时层
 * @author zoujiandong
 *
 */
var CountDownLayer = (function (_super) {
    __extends(CountDownLayer, _super);
    function CountDownLayer() {
        _super.call(this);
        this.timer = null;
        this.tf = null;
        this.bg = null;
        this.isShow = true;
        this.init();
    }
    var d = __define,c=CountDownLayer,p=c.prototype;
    CountDownLayer.getInstance = function () {
        if (!CountDownLayer._instance) {
            CountDownLayer._instance = new CountDownLayer();
        }
        return CountDownLayer._instance;
    };
    p.init = function () {
        this.bg = Global.createBitmapByName("countdown");
        this.addChild(this.bg);
        this.bg.x = (Global.STAGE_WIDTH - this.bg.width) / 2;
        this.bg.y = 214 - 10;
        this.tf = new egret.TextField();
        this.addChild(this.tf);
        this.tf.size = 25;
        this.tf.textColor = 0xff0000;
        this.tf.x = (Global.STAGE_WIDTH - this.tf.textWidth) / 2;
        this.tf.y = 230;
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        Global.ROOT.addChild(this);
        this.hide();
    };
    p.show = function () {
        if (!this.isShow) {
            this.visible = true;
            this.timer.start();
            this.isShow = true;
        }
    };
    p.hide = function () {
        if (this.isShow) {
            this.visible = false;
            this.timer.stop();
            this.isShow = false;
        }
    };
    p.onTimer = function (e) {
        var gap = 0;
        if (Global.CURRENT_STATUS == Global.PREGAMESTATUS) {
            gap = Global.GAME_STARE_TIME - Global.NOW_TIME;
            this.tf.text = "倒计时：" + Math.floor(gap);
        }
        else if (Global.CURRENT_STATUS == Global.RESTSTR) {
            if (this.timer && this.timer.running == true) {
                this.timer.stop();
            }
            this.tf.text = "停止";
        }
        this.tf.x = (Global.STAGE_WIDTH - this.tf.width) / 2;
        this.tf.y = 230;
    };
    CountDownLayer._instance = null;
    return CountDownLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(CountDownLayer,'CountDownLayer');
//# sourceMappingURL=CountDownLayer.js.map