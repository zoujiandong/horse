/**
 *
 * @author
 *
 */
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground() {
        _super.call(this);
        this.distance = 0;
        this.runTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.init();
    }
    var d = __define,c=Ground,p=c.prototype;
    p.init = function () {
        this.bgList = new Array();
        var bg1 = Global.createBitmapByName("ground");
        this.addChild(bg1);
        bg1.smoothing = true;
        var bg2 = Global.createBitmapByName("ground");
        this.addChild(bg2);
        bg2.smoothing = true;
        this.bgList.push(bg1);
        this.bgList.push(bg2);
        this.resetBgPos();
        this.startLine = new EndLine(false);
        this.addChild(this.startLine);
        this.startPos = Global.GOUND_WIDTH - Global.HORSE_GAP - (35 + 70);
        this.startLine.x = this.startPos;
        this.startLine.y = 122;
        this.endLine = new EndLine();
        this.addChild(this.endLine);
        //        this.endPos = (-Global.TOTAL_DISTANCE) * Global.RUN_SPEED_ADD + Global.GOUND_WIDTH - Global.HORSE_GAP;
        this.endPos = (-Global.TOTAL_DISTANCE) * Global.RUN_SPEED_ADD + Global.GOUND_WIDTH - Global.HORSE_GAP - (35 + 70);
        this.endLine.x = this.endPos;
        ////        this.endLine.x = 0;
        this.endLine.y = 122;
        this.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        //        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeHandler,this);
    };
    p.gameStartHandler = function () {
        this.runTime = Math.max(0, Global.NOW_TIME - Global.GAME_STARE_TIME);
    };
    p.onTimer = function () {
        this.runTime = Math.max(0, Global.NOW_TIME - Global.GAME_STARE_TIME);
        var speed = Global.GROUND_SPEED * (Global.timestamp / 1000); // ms转化成s
        this.bgList[0].x += speed * Global.RUN_SPEED_ADD;
        this.bgList[1].x += speed * Global.RUN_SPEED_ADD;
        if (this.bgList[0].x >= (this.bgList[0].width - speed)) {
            this.bgList.reverse();
            this.resetBgPos();
        }
        if (this.endLine != null) {
            this.endLine.x = this.endPos + Global.GROUND_SPEED * Global.RUN_SPEED_ADD * this.runTime;
        }
        if (this.startLine != null) {
            this.startLine.x = this.startPos + Global.GROUND_SPEED * Global.RUN_SPEED_ADD * this.runTime;
            if (this.startLine.x > (Global.GOUND_WIDTH + 200)) {
                this.removeStartLine();
            }
        }
    };
    p.clear = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeHandler, this);
        for (var i = 0; i < this.bgList.length; i++) {
            this.removeChild(this.bgList[i]);
        }
        this.bgList.length = 0;
        this.removeStartLine();
        this.removeEndLine();
    };
    p.removeStartLine = function () {
        if (this.startLine) {
            this.startLine.clear();
            if (this.startLine.parent) {
                this.startLine.parent.removeChild(this.startLine);
            }
            this.startLine = null;
        }
    };
    p.removeEndLine = function () {
        if (this.endLine) {
            this.endLine.clear();
            if (this.endLine.parent) {
                this.endLine.parent.removeChild(this.endLine);
            }
            this.endLine = null;
        }
    };
    p.efHandler = function (e) {
        //        this.bgList[0].x += Global.GROUND_SPEED;
        //        this.bgList[1].x += Global.GROUND_SPEED;
        //        
        //	    if(this.bgList[0].x >= (this.bgList[0].width - Global.GROUND_SPEED))
        //         {
        //            this.bgList.reverse();
        //            this.resetBgPos();
        //         }
        if (this.endLine == null) {
            if ((Global.TOTAL_DISTANCE - this.distance) < Global.GOUND_WIDTH) {
            }
        }
    };
    p.removeHandler = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeHandler, this);
        for (var i = 0; i < this.bgList.length; i++) {
            this.removeChild(this.bgList[i]);
        }
        this.bgList.length = 0;
    };
    p.resetBgPos = function () {
        this.bgList[0].x = 0;
        this.bgList[0].y = 0;
        this.bgList[1].x = this.bgList[0].x - this.bgList[0].width;
        this.bgList[1].y = this.bgList[0].y;
    };
    return Ground;
})(egret.DisplayObjectContainer);
egret.registerClass(Ground,'Ground');
//# sourceMappingURL=Ground.js.map