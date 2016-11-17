/**
 *
 * @author
 *
 */
var HistoryLite = (function (_super) {
    __extends(HistoryLite, _super);
    function HistoryLite(_index, _info) {
        _super.call(this);
        this.index = _index;
        this.info = _info;
        this.init();
    }
    var d = __define,c=HistoryLite,p=c.prototype;
    p.init = function () {
        var bg = null;
        if (this.index % 2 == 0) {
            bg = Global.createBitmapByName("lite1");
        }
        else {
            bg = Global.createBitmapByName("lite2");
        }
        this.addChild(bg);
        var finishTime = this.info.finish;
        var d = new Date(finishTime * 1000);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var day = d.getDay();
        var monthStr = month >= 10 ? "" + month : "0" + month;
        var dateStr = date >= 10 ? "" + date : "0" + date;
        var hourStr = hour >= 10 ? "" + hour : "0" + hour;
        var minuteStr = minute >= 10 ? "" + minute : "0" + minute;
        var secondStr = second >= 10 ? "" + second : "0" + second;
        var dayStr = "";
        switch (day) {
            case 0:
                dayStr = "周日";
                break;
            case 1:
                dayStr = "周一";
                break;
            case 2:
                dayStr = "周二";
                break;
            case 3:
                dayStr = "周三";
                break;
            case 4:
                dayStr = "周四";
                break;
            case 5:
                dayStr = "周五";
                break;
            case 6:
                dayStr = "周六";
                break;
        }
        var mdStr = monthStr + "/" + dateStr;
        var hmsStr = hourStr + ":" + minuteStr + ":" + secondStr;
        // 日期
        var dateTF = new egret.TextField();
        dateTF.textAlign = egret.HorizontalAlign.CENTER;
        dateTF.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(dateTF);
        dateTF.size = 11;
        dateTF.textColor = 0x94756b;
        dateTF.text = mdStr + " " + "[" + dayStr + "]" + " " + hmsStr;
        dateTF.x = 60 + 5 - dateTF.textWidth / 2;
        dateTF.y = 5;
        // 期数
        var currentTF = new egret.TextField();
        //        currentTF.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(currentTF);
        currentTF.size = 11;
        currentTF.textColor = 0x94756b;
        currentTF.text = "" + this.info.no;
        currentTF.x = 175 + 5 - currentTF.textWidth / 2;
        currentTF.y = 5;
        //        currentTF.textAlign = egret.HorizontalAlign.CENTER;
        var firstIndex = -1;
        // 马排名
        var horses = this.info.horses;
        if (horses && horses.length > 0) {
            for (var j = 0; j < horses.length; j++) {
                var record = horses[j];
                var index = record.id;
                if (j == 0) {
                    firstIndex = index + 1;
                }
                var hourseIndexBp = Global.createBitmapByName("num" + (index + 1));
                hourseIndexBp.scaleX = hourseIndexBp.scaleY = 0.35;
                this.addChild(hourseIndexBp);
                hourseIndexBp.x = 241 + j * (hourseIndexBp.width * hourseIndexBp.scaleX + 3);
                hourseIndexBp.y = 0;
            }
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
            var firstTF = new egret.TextField();
            firstTF.textAlign = egret.HorizontalAlign.CENTER;
            firstTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            firstTF.textColor = 0xd43939;
            firstTF.text = "" + firstIndex;
            this.addChild(firstTF);
            firstTF.size = 11;
            firstTF.x = 445 + 5 - firstTF.textWidth / 2;
            firstTF.y = 5;
            // 大小
            var bigTF = new egret.TextField();
            bigTF.textAlign = egret.HorizontalAlign.CENTER;
            bigTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            if (isBig) {
                bigTF.textColor = 0xf2248b;
                bigTF.text = "大";
            }
            else {
                bigTF.textColor = 0x53a0ec;
                bigTF.text = "小";
            }
            bigTF.size = 11;
            this.addChild(bigTF);
            bigTF.x = 483 - bigTF.textWidth / 2;
            bigTF.y = 5;
            // 单 双
            var coupleTF = new egret.TextField();
            if (isCouple) {
                coupleTF.textColor = 0xf2248b;
                coupleTF.text = "双";
            }
            else {
                coupleTF.textColor = 0x53a0ec;
                coupleTF.text = "单";
            }
            coupleTF.size = 11;
            this.addChild(coupleTF);
            coupleTF.x = 518 + 5 - coupleTF.textWidth / 2;
            coupleTF.y = 5;
        }
    };
    return HistoryLite;
})(egret.DisplayObjectContainer);
egret.registerClass(HistoryLite,'HistoryLite');
//# sourceMappingURL=HistoryLite.js.map