/**
 * 终点线
 * @author zoujiandong
 *
 */
var EndLine = (function (_super) {
    __extends(EndLine, _super);
    function EndLine(showFlag) {
        if (showFlag === void 0) { showFlag = true; }
        _super.call(this);
        this.init(showFlag);
    }
    var d = __define,c=EndLine,p=c.prototype;
    p.init = function (showFlag) {
        var mcf = new egret.MovieClipDataFactory(RES.getRes("flag_json"), RES.getRes("flag_png"));
        this.line = Global.createBitmapByName("road");
        this.addChild(this.line);
        if (showFlag) {
            this.flag1 = new egret.MovieClip(mcf.generateMovieClipData("flag"));
            this.flag2 = new egret.MovieClip(mcf.generateMovieClipData("flag"));
            this.flag1.x = 63.3;
            this.flag1.y = -55.95;
            this.flag2.x = 6.3;
            this.flag2.y = 203.55;
            this.addChild(this.flag1);
            this.addChild(this.flag2);
            this.flag1.play();
            this.flag2.play();
            this.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        }
    };
    p.efHandler = function (e) {
        if (this.flag1.currentFrame == this.flag1.totalFrames) {
            this.flag1.gotoAndPlay(1);
        }
        if (this.flag2.currentFrame == this.flag2.totalFrames) {
            this.flag2.gotoAndPlay(1);
        }
    };
    p.clear = function () {
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        }
        if (this.flag1) {
            this.flag1.stop();
            this.removeChild(this.flag1);
            this.flag1 = null;
        }
        if (this.flag2) {
            this.flag2.stop();
            this.removeChild(this.flag2);
            this.flag2 = null;
        }
        if (this.line) {
            this.removeChild(this.line);
            this.line = null;
        }
    };
    return EndLine;
})(egret.DisplayObjectContainer);
egret.registerClass(EndLine,'EndLine');
//# sourceMappingURL=EndLine.js.map