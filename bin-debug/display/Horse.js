/**
 *
 * @author
 *
 */
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(index) {
        _super.call(this);
        this.index = index;
        this.res = "man1";
        this.init();
    }
    var d = __define,c=Horse,p=c.prototype;
    p.init = function () {
        var res = this.res + "_json";
        var data = RES.getRes(res);
        var texture = RES.getRes("man1");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcf.generateMovieClipData("man1"));
        this.addChild(this.mc);
        this.indexTF = new egret.TextField();
        //        this.indexTF.textColor = 0xff0000;
        this.indexTF.size = 100;
        this.indexTF.text = "" + this.index;
        this.addChild(this.indexTF);
        this.mc.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.mc.play();
    };
    p.efHandler = function (e) {
        if (this.mc.currentFrame == this.mc.totalFrames) {
            this.mc.gotoAndPlay(1);
        }
    };
    return Horse;
})(egret.DisplayObjectContainer);
egret.registerClass(Horse,'Horse');
//# sourceMappingURL=Horse.js.map