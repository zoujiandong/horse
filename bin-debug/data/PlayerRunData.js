/**
 *  运动数据
 * @author zoujiandong
 *
 */
var PlayerRunData = (function () {
    function PlayerRunData() {
        // 速度数组
        this.speedList = null;
        // 时间数组
        this.timeList = null;
        // 需要的时间
        this.needTime = 0;
    }
    var d = __define,c=PlayerRunData,p=c.prototype;
    p.updateData = function (spdList, tList, needT) {
        if (this.speedList == null) {
            this.speedList = new Array();
        }
        if (this.timeList == null) {
            this.timeList = new Array();
        }
        this.speedList.length = 0;
        this.timeList.length = 0;
        var i = 0;
        for (i = 0; i < spdList.length; i++) {
            this.speedList[i] = spdList[i];
        }
        for (i = 0; i < tList.length; i++) {
            this.timeList[i] = tList[i];
        }
        this.needTime = needT;
    };
    return PlayerRunData;
})();
egret.registerClass(PlayerRunData,'PlayerRunData');
//# sourceMappingURL=PlayerRunData.js.map