/**
 * 运动数据
 * @author zoujiandong
 *
 */
var PlayerRunDataManager = (function () {
    function PlayerRunDataManager() {
    }
    var d = __define,c=PlayerRunDataManager,p=c.prototype;
    // 清理数据
    PlayerRunDataManager.clearPlayerRunDataList = function () {
        if (PlayerRunDataManager.playerRunDataList.length > 0) {
            PlayerRunDataManager.playerRunDataList.length = 0;
        }
    };
    // 初始化
    PlayerRunDataManager.initPlayerRunDataList = function () {
        for (var i = 0; i < Global.PLAYER_CNT; i++) {
            var playerRunData = new PlayerRunData();
            PlayerRunDataManager.playerRunDataList.push(playerRunData);
        }
    };
    // 更新某个玩家的运动数据
    PlayerRunDataManager.updatePlayerRunDataList = function (index, tList, spdList, needTime) {
        var playerRunData = PlayerRunDataManager.playerRunDataList[index];
        playerRunData.updateData(spdList, tList, needTime);
    };
    PlayerRunDataManager.getFinalResult = function () {
        var result = new Array();
        var tmpList = new Array();
        var obj;
        for (var i = 0; i < PlayerRunDataManager.playerRunDataList.length; i++) {
            obj = new Object();
            tmpList.push(obj);
            obj["index"] = i + 1;
            //            var distance:number = 0;
            //            for(var j:number = 0; j < PlayerRunDataManager.playerRunDataList[i].timeList.length; j ++)
            //            {
            //                distance += (PlayerRunDataManager.playerRunDataList[i].timeList[j] * PlayerRunDataManager.playerRunDataList[i].speedList[j]);
            //            }
            //            obj["distance"] = distance;
            var needTime = PlayerRunDataManager.playerRunDataList[i].needTime;
            obj["needTime"] = needTime;
        }
        var str = "";
        for (i = 0; i < tmpList.length; i++) {
            str += ("index:" + tmpList[i]["index"] + " needTime:" + tmpList[i]["needTime"]);
        }
        //        console.log("final result:" + str);
        tmpList.sort(PlayerRunDataManager.sortFun);
        for (i = 0; i < tmpList.length; i++) {
            result.push(tmpList[i]["index"]);
        }
        return result;
    };
    PlayerRunDataManager.sortFun = function (a, b) {
        if (a["needTime"] < b["needTime"]) {
            return -1;
        }
        else {
            return 1;
        }
    };
    PlayerRunDataManager.playerRunDataList = new Array();
    return PlayerRunDataManager;
})();
egret.registerClass(PlayerRunDataManager,'PlayerRunDataManager');
//# sourceMappingURL=PlayerRunDataManager.js.map