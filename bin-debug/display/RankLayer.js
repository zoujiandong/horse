/**
 * 排名层
 * @author zoujiandong
 *
 */
var RankLayer = (function (_super) {
    __extends(RankLayer, _super);
    function RankLayer() {
        _super.call(this);
        this.numberBmpGap = 2;
        this.init();
        this.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
    }
    var d = __define,c=RankLayer,p=c.prototype;
    p.init = function () {
        this.numberContainer = new egret.DisplayObjectContainer();
        this.addChild(this.numberContainer);
        this.numberBmpList = new Array();
        var rankList = new Array();
        for (var i = 0; i < Global.PLAYER_CNT; i++) {
            rankList.push(i + 1); // 【1， 2， 3， 4， 5， 6， 7， 8， 9， 10】
        }
        this.render(rankList);
    };
    // 比赛结束显示当场比赛的结果
    p.refreshGameEnd = function () {
        var finalReult = PlayerRunDataManager.getFinalResult();
        this.render(finalReult);
    };
    // 准备阶段显示上场比赛的结果
    p.updateLastRank = function () {
        if (Global.CURRENT_STATUS == Global.PREGAMESTATUS || Global.CURRENT_STATUS == Global.RESTSTR) {
            if (Global.historyList.length > 0) {
                var rankList = new Array();
                var historyLast = Global.historyList[0];
                var firstIndex = -1;
                // 马排名
                var horses = historyLast.horses;
                if (horses && horses.length > 0) {
                    for (var i = 0; i < horses.length; i++) {
                        rankList.push(horses[i].id + 1);
                    }
                }
                if (rankList.length > 0) {
                    this.render(rankList);
                }
            }
        }
    };
    // 比赛中，实时显示当场比赛的结果
    p.efHandler = function (e) {
        if (Global.Gaming == false)
            return;
        var renderRank = false;
        var tmpRankList = this.getRank();
        if (Global.RANK_LIST == null) {
            Global.RANK_LIST = tmpRankList;
            renderRank = true;
        }
        else {
            if (tmpRankList.toString() != Global.RANK_LIST.toString()) {
                Global.RANK_LIST = tmpRankList;
                renderRank = true;
            }
        }
        if (renderRank) {
            this.render(Global.RANK_LIST);
        }
    };
    p.getRank = function () {
        var rankList = new Array();
        var tmpList = new Array();
        var i = 0;
        for (i = 0; i < Global.mainScene.playerLayer.playerList.length; i++) {
            var obj = new Object();
            obj["id"] = Global.mainScene.playerLayer.playerList[i].index;
            obj["dis"] = Global.mainScene.playerLayer.playerList[i].distance;
            tmpList.push(obj);
        }
        tmpList.sort(this.sortHandler);
        for (i = 0; i < tmpList.length; i++) {
            rankList.push(tmpList[i]["id"]);
        }
        return rankList;
    };
    p.sortHandler = function (a, b) {
        if (a["dis"] > b["dis"]) {
            return -1;
        }
        else {
            return 1;
        }
    };
    p.render = function (rankList) {
        var i = 0;
        var numberBmp = null;
        if (this.numberContainer.numChildren == 0) {
            for (i = 0; i < rankList.length; i++) {
                numberBmp = Global.createBitmapByName("num" + rankList[i]);
                this.numberBmpList.push(numberBmp);
                numberBmp.scaleX = numberBmp.scaleY = 0.6;
                this.numberContainer.addChild(numberBmp);
            }
        }
        for (i = 0; i < rankList.length; i++) {
            // 当前排名对应的图片索引
            var currentRank = rankList[i] - 1;
            // 对应的图片
            numberBmp = this.numberBmpList[currentRank];
            numberBmp.x = i * (numberBmp.width * numberBmp.scaleX + this.numberBmpGap);
        }
    };
    p.clear = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.numberBmpGap = 0;
        if (this.numberBmpList) {
            if (this.numberBmpList.length > 0) {
                for (var i = 0; i < this.numberBmpList.length; i++) {
                    this.numberBmpList[i].parent.removeChild(this.numberBmpList[i]);
                }
                this.numberBmpList.length = 0;
            }
            this.numberBmpList = null;
        }
        if (this.numberContainer) {
            while (this.numberContainer.numChildren > 0) {
                this.numberContainer.removeChildAt(0);
            }
            this.numberContainer = null;
        }
    };
    return RankLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(RankLayer,'RankLayer');
//# sourceMappingURL=RankLayer.js.map