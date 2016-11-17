/**
 *
 * @author 顶层
 *
 */
var TopLayer = (function (_super) {
    __extends(TopLayer, _super);
    function TopLayer() {
        _super.call(this);
        // 上一场期数
        this.lastIndex = null;
        // 当前场期数
        this.currentIndex = null;
        // 当前场开奖时间倒计时
        this.currentOpen = null;
        this.init();
    }
    var d = __define,c=TopLayer,p=c.prototype;
    p.init = function () {
        var bg = Global.createBitmapByName("topBg");
        this.addChild(bg);
        //        var net:egret.TextField = new egret.TextField();
        //        this.addChild(net);
        //        net.textColor = 0x9d131f;
        //        net.size = 13;
        //        net.text = "raceba.net";
        //        net.x = 15;
        //        net.y = 28;
        this.lastIndex = new egret.TextField();
        this.lastIndex.size = 13;
        this.lastIndex.textColor = 0xe13141;
        this.lastIndex.text = "";
        this.addChild(this.lastIndex);
        this.lastIndex.x = 46;
        this.lastIndex.y = 47;
        this.currentIndex = new egret.TextField();
        this.currentIndex.size = 13;
        this.currentIndex.textColor = 0xe0d531;
        this.addChild(this.currentIndex);
        this.currentIndex.text = "";
        this.currentIndex.x = 475;
        this.currentIndex.y = 22;
        this.currentOpen = new egret.TextField();
        this.currentOpen.size = 13;
        this.currentOpen.textColor = 0xe13141;
        this.currentOpen.text = "";
        this.addChild(this.currentOpen);
        this.currentOpen.x = this.currentIndex.x;
        this.currentOpen.y = 43;
    };
    // 准备阶段，显示上场的比赛期数
    p.updateLast = function () {
        if (Global.CURRENT_STATUS == Global.PREGAMESTATUS || Global.CURRENT_STATUS == Global.RESTSTR) {
            if (Global.historyList.length > 0) {
                var rankList = new Array();
                var historyLast = Global.historyList[0];
                var no = historyLast.no;
                this.lastIndex.text = "" + no;
            }
        }
    };
    // 比赛中和比赛结束，显示当场比赛期数
    p.updateLastToCurrent = function () {
        this.lastIndex.text = "" + Global.GAME_NO;
    };
    // 隐藏显示
    p.hideCurrent = function () {
        this.currentIndex.text = "";
        this.currentOpen.text = "";
    };
    p.updateCurrent = function () {
        //        this.lastIndex.text = "" + Global.GAME_NO;
        this.currentIndex.text = "" + (Global.GAME_NO);
        var date = new Date(Global.XIAZHU_ENDTIME * 1000);
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var hourStr = hour >= 10 ? "" + hour : "0" + hour;
        var minuteStr = minute >= 10 ? "" + minute : "0" + minute;
        var secondStr = second >= 10 ? "" + second : "0" + second;
        var timeStr = hourStr + ":" + minuteStr + ":" + secondStr;
        this.currentOpen.text = timeStr;
    };
    p.clear = function () {
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        this.currentIndex = null;
        this.currentIndex = null;
        this.currentOpen = null;
    };
    return TopLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(TopLayer,'TopLayer');
//# sourceMappingURL=TopLayer.js.map