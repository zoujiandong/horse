/**
 * 玩家
 * @author zoujiandong
 *
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(index) {
        _super.call(this);
        this.runTime = 0;
        this.speed = 12;
        this.distance = 0;
        this.runData = null;
        this.indexI = -1;
        this.index = index;
        this.res = "horse" + this.index;
        this.status = Global.PLAYER_STATUS_WAIT;
        this.init();
    }
    var d = __define,c=Player,p=c.prototype;
    p.init = function () {
        this.runData = PlayerRunDataManager.playerRunDataList[this.index - 1];
        var res = this.res + "_json";
        var data = RES.getRes(res);
        var texture = RES.getRes(this.res + "_png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcf.generateMovieClipData(this.res));
        this.mc.gotoAndStop(7);
        this.addChild(this.mc);
        this.mc.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.mc.smoothing = true;
        //        var timer: egret.Timer = new egret.Timer(5000);
        //        timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        //        timer.start();
    };
    p.efHandler = function (e) {
        if (this.status == Global.PLAYER_STATUS_WAIT) {
            this.mc.gotoAndStop(7);
            return;
        }
        if (this.mc.currentFrame == this.mc.totalFrames) {
            this.mc.gotoAndPlay(1);
        }
    };
    p.updateData = function () {
        this.runData = PlayerRunDataManager.playerRunDataList[this.index - 1];
    };
    p.onTimer = function () {
        this.runTime = Math.max(0, Global.NOW_TIME - Global.GAME_STARE_TIME);
        this.distance = this.getDistance();
        this.x = -(this.getDistance() - (Global.GROUND_SPEED * this.runTime)) * Global.RUN_SPEED_ADD;
    };
    p.gameStartHandler = function () {
        this.status = Global.PLAYER_STATUS_RUN;
        this.runTime = Math.max(0, Global.NOW_TIME - Global.GAME_STARE_TIME);
        this.mc.play();
    };
    p.gameEndHandler = function () {
        this.status = Global.PLAYER_STATUS_WAIT;
        this.mc.gotoAndStop(7);
    };
    p.clear = function () {
        this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.index = 0;
        this.res = "";
        if (this.mc) {
            this.mc.stop();
            if (this.mc.parent != null) {
                this.mc.parent.removeChild(this.mc);
            }
            this.mc = null;
        }
        this.status = "";
        this.runTime = 0;
        this.speed = 0;
        this.distance = 0;
        this.runData = null;
    };
    p.getDistance = function () {
        var index = -1;
        var current = 0;
        var next = 0;
        var runT = this.runTime;
        var value = 0;
        for (var i = 0; i < this.runData.timeList.length; i++) {
            if (runT >= this.runData.timeList[i]) {
                value += this.runData.speedList[i] * this.runData.timeList[i];
                runT -= this.runData.timeList[i];
            }
            else {
                value += this.runData.speedList[i] * runT;
                break;
            }
        }
        return value;
    };
    p.getSpeed = function () {
        var index = -1;
        var current = 0;
        var next = 0;
        // [8, 15, 20, 30] time
        for (var i = 0; i < this.runData.timeList.length; i++) {
            var changeSpeedTime = 0;
            for (var j = 0; j <= i; j++) {
                changeSpeedTime += this.runData.timeList[j];
            }
            //            if(this.runTime < this.runData.timeList[i])
            if (this.runTime < changeSpeedTime) {
                if (i != this.indexI) {
                }
                index = i;
                this.indexI = i;
                break;
            }
        }
        return this.runData.speedList[index];
    };
    return Player;
})(egret.DisplayObjectContainer);
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map