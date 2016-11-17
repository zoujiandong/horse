/**
 *
 * @author 底部层
 *
 */
var BottomLayer = (function (_super) {
    __extends(BottomLayer, _super);
    function BottomLayer() {
        _super.call(this);
        this.currentTF = null;
        this.firstTF = null;
        this.bigTF = null;
        this.coupleTF = null;
        this.init();
    }
    var d = __define,c=BottomLayer,p=c.prototype;
    p.init = function () {
        var bg = Global.createBitmapByName("buttombg");
        this.addChild(bg);
        this.currentTF = new egret.TextField();
        this.currentTF.textColor = 0x94756b;
        this.addChild(this.currentTF);
        this.currentTF.size = 20;
        this.currentTF.x = 50;
        this.currentTF.y = 40;
        this.firstTF = new egret.TextField();
        this.addChild(this.firstTF);
        this.firstTF.size = 20;
        this.firstTF.x = 382 - this.firstTF.textWidth / 2;
        this.firstTF.y = 40;
        this.bigTF = new egret.TextField();
        this.addChild(this.bigTF);
        this.bigTF.size = 20;
        this.bigTF.x = 432 - this.bigTF.textWidth / 2;
        this.bigTF.y = 40;
        this.coupleTF = new egret.TextField();
        this.addChild(this.coupleTF);
        this.coupleTF.size = 20;
        this.coupleTF.x = 483 - this.coupleTF.textWidth / 2;
        this.coupleTF.y = 40;
    };
    p.updateLastToCurrent = function () {
        var dateStr = this.convertToDateStr(Global.GAME_END_TIME);
        var qiStr = Global.GAME_NO + "";
        this.currentTF.text = dateStr + "    " + qiStr;
        var resultList = PlayerRunDataManager.getFinalResult();
        var firstIndex = -1;
        firstIndex = resultList[0];
        // 第一名
        if (firstIndex != -1) {
            var isBig;
            var isCouple;
            if (firstIndex <= 4) {
                // 小
                isBig = false;
            }
            else {
                // 大
                isBig = true;
            }
            if (firstIndex % 2 == 0) {
                // 单
                isCouple = true;
            }
            else {
                // 双
                isCouple = false;
            }
            // 冠军号码
            this.firstTF.textColor = 0xd43939;
            this.firstTF.text = "" + firstIndex;
            // 大小
            if (isBig) {
                this.bigTF.textColor = 0xf2248b;
                this.bigTF.text = "大";
            }
            else {
                this.bigTF.textColor = 0x53a0ec;
                this.bigTF.text = "小";
            }
            // 单 双
            if (isCouple) {
                this.coupleTF.textColor = 0xf2248b;
                this.coupleTF.text = "双";
            }
            else {
                this.coupleTF.textColor = 0x53a0ec;
                this.coupleTF.text = "单";
            }
        }
        else {
            this.firstTF.text = "";
            this.bigTF.text = "";
            this.coupleTF.text = "";
        }
        if (Global.Gaming) {
            this.firstTF.text = "";
            this.bigTF.text = "";
            this.coupleTF.text = "";
        }
    };
    // 准备阶段显示上场比赛的结果
    p.updateLast = function () {
        if (Global.CURRENT_STATUS == Global.PREGAMESTATUS || Global.CURRENT_STATUS == Global.RESTSTR) {
            if (Global.historyList.length > 0) {
                var historyLast = Global.historyList[0];
                var dateStr = this.convertToDateStr(historyLast.finish);
                // 期数
                this.currentTF.textColor = 0x94756b;
                this.currentTF.text = dateStr + "   " + historyLast.no;
                var firstIndex = -1;
                // 马排名
                var horses = historyLast.horses;
                if (horses && horses.length > 0) {
                    firstIndex = (horses[0].id + 1);
                }
                // 第一名
                if (firstIndex != -1) {
                    var isBig;
                    var isCouple;
                    if (firstIndex <= 4) {
                        // 小
                        isBig = false;
                    }
                    else {
                        // 大
                        isBig = true;
                    }
                    if (firstIndex % 2 == 0) {
                        // 单
                        isCouple = true;
                    }
                    else {
                        // 双
                        isCouple = false;
                    }
                    // 冠军号码
                    this.firstTF.textColor = 0xd43939;
                    this.firstTF.text = "" + firstIndex;
                    // 大小
                    if (isBig) {
                        this.bigTF.textColor = 0xf2248b;
                        this.bigTF.text = "大";
                    }
                    else {
                        this.bigTF.textColor = 0x53a0ec;
                        this.bigTF.text = "小";
                    }
                    // 单 双
                    if (isCouple) {
                        this.coupleTF.textColor = 0xf2248b;
                        this.coupleTF.text = "双";
                    }
                    else {
                        this.coupleTF.textColor = 0x53a0ec;
                        this.coupleTF.text = "单";
                    }
                }
                else {
                    this.firstTF.text = "";
                    this.bigTF.text = "";
                    this.coupleTF.text = "";
                }
            }
            else {
                this.currentTF.text = "";
                this.firstTF.text = "";
                this.bigTF.text = "";
                this.coupleTF.text = "";
            }
        }
    };
    p.convertToDateStr = function (time) {
        var str = "";
        var finishTime = time;
        var d = new Date(finishTime * 1000);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var day = d.getDay();
        var yearStr = year + "";
        var monthStr = month >= 10 ? "" + month : "0" + month;
        var dateStr = date >= 10 ? "" + date : "0" + date;
        var hourStr = hour >= 10 ? "" + hour : "0" + hour;
        var minuteStr = minute >= 10 ? "" + minute : "0" + minute;
        var secondStr = second >= 10 ? "" + second : "0" + second;
        str = yearStr + "-" + monthStr + "-" + dateStr + "  "
            + hourStr + ":" + minuteStr + ":" + secondStr;
        return str;
    };
    p.clear = function () {
    };
    return BottomLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(BottomLayer,'BottomLayer');
//# sourceMappingURL=BottomLayer.js.map