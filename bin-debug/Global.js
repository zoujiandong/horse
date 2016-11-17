/**
 * 全局控制类
 * @author zoujiandong
 *
 */
var Global = (function () {
    function Global() {
    }
    var d = __define,c=Global,p=c.prototype;
    Global.Init = function () {
        if (Global.RANK_LIST)
            Global.RANK_LIST.length = 0;
        Global.Gaming = false; // 是否在比赛中
        ///////////////////////时间相关   下注--------人工修改--------预告结束------比赛阶段-------比赛结束
        // 当前时间
        Global.NOW_TIME = 0;
        // 下注截止时间
        Global.XIAZHU_ENDTIME = 0;
        // 人工修改截止时间
        Global.MANUAL_MODIFY_ENDTIME = 0;
        // 每段速度的时间
        Global.PIECE_TIME = 0;
        // 比赛开始时间
        Global.GAME_STARE_TIME = 0;
        // 跑步结束时间
        Global.RUN_END_TIME = 0;
        // 比赛结束时间
        Global.GAME_END_TIME = 0;
        ////////////////////////////URL请求相关   http请求马的数据  http1请求人工修改数据
        Global.HAS_SEND_HTTP = false;
        Global.HAS_SEND_HTTP1 = false;
        Global.HAS_RECEIVE_HTTP = false; // 是否收到了马的数据
        Global.HAS_RECEIVE_HTTP1 = false; // 是否收到了人工修改的数据
        if (Global.HORSE_TMP_DATALIST)
            Global.HORSE_TMP_DATALIST.length = 0; // 储存http请求马的数据
        Global.MANUAL_FIRST_ID = -1; // 手工改动的第一名
        //////////////////////////当前状态
        Global.CURRENT_STATUS = ""; // 当前状态
        // 总路程
        Global.TOTAL_DISTANCE = 4000;
        //        Global.CountDownLayer = null;
        Global.mainScene = null;
        Global.resultLayer = null;
        // 初始化比赛数据
        Global.initPlayerRunDataList();
        Global.mainScene = new MainScene();
        Global.MAINSCENE_ROOT.addChild(Global.mainScene);
        //        Global.GlobalTimerStart();
    };
    Global.FreshGameTime = function (currenetTime, gameStartTime, gameEndTime) {
        Global.NOW_TIME = currenetTime;
        Global.GAME_STARE_TIME = gameStartTime;
        Global.GAME_END_TIME = gameEndTime;
    };
    Global.GlobalTimerStart = function () {
        //	    if(Global.GlobalTimer != null)
        //        {
        //            Global.GlobalTimer.start();
        //        }
        //    	  egret.startTick(Global.globalTimerHd, null);
        egret.Ticker.getInstance().register(Global.globalTimerHd, Global);
    };
    Global.GlobalTimerStop = function () {
        //	    if(Global.GlobalTimer != null)
        //        { 
        //            Global.GlobalTimer.stop();
        //        }
        //    	  egret.stopTick(Global.globalTimerHd, null);
        egret.Ticker.getInstance().unregister(Global.globalTimerHd, Global);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    Global.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    // 初始化玩家数据
    Global.initPlayerRunDataList = function () {
        // 清理数据
        PlayerRunDataManager.clearPlayerRunDataList();
        // 初始化每个玩家的运动数据（空数据）
        PlayerRunDataManager.initPlayerRunDataList();
        //        var t1: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s1: Array<number> = new Array<number>(101,100,103,104,102);
        //        PlayerRunDataManager.updatePlayerRunDataList(0,t1,s1);
        //
        //        var t2: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s2: Array<number> = new Array<number>(103,104,105,102,101);
        //        PlayerRunDataManager.updatePlayerRunDataList(1,t2,s2);
        //
        //        var t3: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s3: Array<number> = new Array<number>(106,105,102,104,103);
        //        PlayerRunDataManager.updatePlayerRunDataList(2,t3,s3);
        //
        //        var t4: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s4: Array<number> = new Array<number>(105,106,103,104,107);
        //        PlayerRunDataManager.updatePlayerRunDataList(3,t4,s4);
        //
        //        var t5: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s5: Array<number> = new Array<number>(105,104,107,108,106);
        //        PlayerRunDataManager.updatePlayerRunDataList(4,t5,s5);
        //
        //        var t6: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s6: Array<number> = new Array<number>(108,105,107,106,109);
        //        PlayerRunDataManager.updatePlayerRunDataList(5,t6,s6);
        //
        //        var t7: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s7: Array<number> = new Array<number>(106,109,108,109,107);
        //        PlayerRunDataManager.updatePlayerRunDataList(6,t7,s7);
        //
        //        var t8: Array<number> = new Array<number>(2,2,2,2,2);
        //        var s8: Array<number> = new Array<number>(109,109,101,108,107);
        //        PlayerRunDataManager.updatePlayerRunDataList(7,t8,s8);
        //
        ////        var t9: Array<number> = new Array<number>(8,10,15,22);
        ////        var s9: Array<number> = new Array<number>(395 + Math.random() * 20,395 + Math.random() * 20,395 + Math.random() * 20,395 + Math.random() * 20);
        ////        PlayerRunDataManager.updatePlayerRunDataList(8,t9,s9);
        ////
        ////        var t10: Array<number> = new Array<number>(8,10,15,22);
        ////        var s10: Array<number> = new Array<number>(395 + Math.random() * 20,395 + Math.random() * 20,395 + Math.random() * 20,395 + Math.random() * 20);
        ////        PlayerRunDataManager.updatePlayerRunDataList(9,t10,s10);
        //        
        //        console.log("初始化数据：------------------");
        //        for(var i:number = 0; i < PlayerRunDataManager.playerRunDataList.length; i ++)
        //        {
        //            console.log("第" + (i + 1) + "匹马：" + "speedList---" + PlayerRunDataManager.playerRunDataList[i].speedList.toString() + " timeList---" + PlayerRunDataManager.playerRunDataList[i].timeList.toString());
        //        }
        //        console.log("初始化数据结束");
    };
    Global.changeRank = function (id) {
        var firstId = id;
        var changeId = 0;
        var firstIdIndex = -1;
        for (var i = 0; i < Global.HORSE_TMP_DATALIST.length; i++) {
            var horseDataLite = Global.HORSE_TMP_DATALIST[i];
            if (horseDataLite.id == firstId) {
                firstIdIndex = i;
                break;
            }
        }
        var minIndex = 0;
        var minTime = 10000;
        for (i = 0; i < Global.HORSE_TMP_DATALIST.length; i++) {
            var horseDataLite1 = Global.HORSE_TMP_DATALIST[i];
            if (horseDataLite1.needTime < minTime) {
                minTime = horseDataLite1.needTime;
                minIndex = i;
            }
        }
        if (minIndex != firstIdIndex) {
            Global.HORSE_TMP_DATALIST[minIndex].id = firstIdIndex;
            Global.HORSE_TMP_DATALIST[firstIdIndex].id = minIndex;
        }
    };
    Global.horseDataHandler = function () {
        if (Global.HORSE_TMP_DATALIST.length > 0) {
            for (var i = 0; i < Global.HORSE_TMP_DATALIST.length; i++) {
                var horseDataLite = Global.HORSE_TMP_DATALIST[i];
                var id = horseDataLite.id;
                var speedList = horseDataLite.speed;
                var timeList = new Array();
                for (var j = 0; j < speedList.length; j++) {
                    timeList.push(Global.PIECE_TIME);
                }
                var needTime = horseDataLite.needTime;
                PlayerRunDataManager.updatePlayerRunDataList(id, timeList, speedList, needTime);
            }
            //            console.log("初始化数据：------------------");
            for (var i = 0; i < PlayerRunDataManager.playerRunDataList.length; i++) {
            }
        }
    };
    Global.GlobalTimerHandler = function () {
        var status = "";
        if (Global.NOW_TIME < Global.GAME_STARE_TIME) {
            status = Global.PREGAMESTATUS;
            Global.CURRENT_STATUS = status;
            // 显示倒计时
            //            if(Global.CountDownLayer == null) {
            ////                Global.CountDownLayer = new CountDownLayer();
            //                Global.CountDownLayer = CountDownLayer.getInstance();
            //                Global.ROOT.addChild(Global.CountDownLayer);
            //            }
            CountDownLayer.getInstance().show();
            // 请求人工修改之后的马的数据
            if (Global.NOW_TIME >= (Global.MANUAL_MODIFY_ENDTIME + 2)) {
                if (!Global.HAS_SEND_HTTP) {
                    //                    console.log("请求人工修改后的数据");
                    Global.HAS_SEND_HTTP = true;
                    Transport.getInstance().sendHttpReq();
                }
            }
        }
        else if (Global.NOW_TIME >= Global.GAME_STARE_TIME && Global.NOW_TIME < Global.RUN_END_TIME) {
            // 请求马的数据
            if (!Global.HAS_SEND_HTTP) {
                //                console.log("比赛开始，请求修改后的数据：");
                Transport.getInstance().sendHttpReq();
                Global.HAS_SEND_HTTP = true;
            }
            status = Global.GAMEINGSTR;
            Global.CURRENT_STATUS = status;
            // 收到了马的数据之后 开始跑步
            if (!Global.Gaming && Global.HAS_RECEIVE_HTTP) {
                Global.Gaming = true;
                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_START_STRING));
            }
            // 移除倒计时界面
            //            if(Global.CountDownLayer && Global.CountDownLayer.parent) {
            //                Global.CountDownLayer.clear();
            //                Global.CountDownLayer = null;
            //            }
            CountDownLayer.getInstance().hide();
        }
        else if (Global.NOW_TIME >= Global.RUN_END_TIME && Global.NOW_TIME < Global.GAME_END_TIME) {
            CountDownLayer.getInstance().hide();
            Global.Gaming = false;
            // 请求马的数据
            if (!Global.HAS_SEND_HTTP) {
                //                console.log("结果展示，请求修改之后的数据")
                Transport.getInstance().sendHttpReq();
                Global.HAS_SEND_HTTP = true;
            }
            status = Global.SHOWRANKSTR;
            // 收到了马的数据之后展示结果界面
            if (Global.CURRENT_STATUS != status && Global.HAS_RECEIVE_HTTP) {
                // 更新历史界面
                Global.historyPanel.Request();
                Global.CURRENT_STATUS = status;
                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_END_STRING));
            }
        }
        else if (Global.NOW_TIME >= Global.GAME_END_TIME) {
            CountDownLayer.getInstance().hide();
            Global.Gaming = false;
            // 移除结果界面
            if (Global.resultLayer) {
                Global.resultLayer.clear();
                Global.resultLayer = null;
            }
            Global.GlobalTimerStop();
            Global.Init();
            //            Global.rizhipanel.clear();
            Transport.getInstance().sendHttpReqStart();
        }
        //        var status:string = "";
        //        if(Global.NOW_TIME < Global.XIAZHU_ENDTIME)// 下注阶段
        //        {
        //            status = Global.XIAZHU_STR;
        //            Global.CURRENT_STATUS = status;
        //            if(Global.CountDownLayer == null) {
        //                Global.CountDownLayer = new CountDownLayer();
        //                Global.ROOT.addChild(Global.CountDownLayer);
        //            }
        //        }
        //        else if(Global.NOW_TIME >= Global.XIAZHU_ENDTIME && Global.NOW_TIME < Global.MANUAL_MODIFY_ENDTIME) // 预告阶段的手动修改阶段
        //        {
        //            status = Global.GAMEPRE_STR;
        //            
        //            Global.CURRENT_STATUS = status;
        //            
        //        
        //            //if(Global.CURRENT_STATUS != status) {
        //            // 请求马的数据
        //                if(!Global.HAS_SEND_HTTP) {
        //                    Transport.getInstance().sendHttpReq();
        //                    Global.HAS_SEND_HTTP = true;
        //                }
        //            //}
        //                
        //            if(Global.CountDownLayer == null)
        //            {
        //                Global.CountDownLayer = new CountDownLayer();
        //                Global.ROOT.addChild(Global.CountDownLayer);
        //            }
        //        }
        //        else if(Global.NOW_TIME >= Global.MANUAL_MODIFY_ENDTIME && Global.NOW_TIME < Global.GAME_STARE_TIME)// 手动修改之后的预告阶段
        //        {
        //            status = Global.GAMEPRE_STR;
        //            Global.CURRENT_STATUS = status;
        //            
        //            // 请求马的数据
        //            if(Global.CountDownLayer == null) {
        //                Global.CountDownLayer = new CountDownLayer();
        //                Global.ROOT.addChild(Global.CountDownLayer);
        //            }
        //            // 手动修改结束后请求手动修改的结果
        //            if(!Global.HAS_SEND_HTTP1)
        //            {
        //                Transport.getInstance().sendHttpReq1();
        //                Global.HAS_SEND_HTTP1 = true;
        //            }
        //        }
        //        else if(Global.NOW_TIME >= Global.GAME_STARE_TIME && Global.NOW_TIME < Global.RUN_END_TIME)        // 跑步阶段
        //        {
        //            // 请求马的数据
        //            if(!Global.HAS_SEND_HTTP) {
        //                Transport.getInstance().sendHttpReq();
        //                Global.HAS_SEND_HTTP = true;
        //            }
        //            // 手动修改结束后请求手动修改的结果
        //            if(!Global.HAS_SEND_HTTP1) {
        //                Transport.getInstance().sendHttpReq1();
        //                Global.HAS_SEND_HTTP1 = true;
        //            }
        //            
        //            status = Global.GAMEINGSTR;
        //            Global.CURRENT_STATUS = status;
        //            if(!Global.Gaming && Global.HAS_RECEIVE_HTTP && Global.HAS_RECEIVE_HTTP1)
        //            {
        ////                Global.horseDataHandler();
        //                Global.Gaming = true;
        //                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_START_STRING));// 收到了马的数据和人工修改的数据之后
        //            }
        //            if(Global.CountDownLayer && Global.CountDownLayer.parent) 
        //            {
        //                Global.CountDownLayer.clear();
        //                Global.CountDownLayer = null;
        //            }
        //        }
        //        else if(Global.NOW_TIME >= Global.RUN_END_TIME && Global.NOW_TIME < Global.GAME_END_TIME)// 展示排名阶段
        //        {
        //            // 请求马的数据
        //            if(!Global.HAS_SEND_HTTP) {
        //                Transport.getInstance().sendHttpReq();
        //                Global.HAS_SEND_HTTP = true;
        //            }
        //            // 手动修改结束后请求手动修改的结果
        //            if(!Global.HAS_SEND_HTTP1) {
        //                Transport.getInstance().sendHttpReq1();
        //                Global.HAS_SEND_HTTP1 = true;
        //            }
        //            
        //            status = Global.SHOWRANKSTR;
        //            if(Global.CURRENT_STATUS != status && Global.HAS_RECEIVE_HTTP && Global.HAS_RECEIVE_HTTP1)// 收到了马的数据和人工修改的数据之后
        //            {
        //                Global.CURRENT_STATUS = status;
        //                Global.Gaming = false;
        //                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_END_STRING));
        //            }
        //            
        ////            if(Global.Gaming && Global.HAS_RECEIVE_HTTP && Global.HAS_RECEIVE_HTTP1)// 收到了马的数据和人工修改的数据之后
        ////            {
        ////                Global.Gaming = false;
        ////                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_END_STRING));
        ////            }
        //        }
        //        else if(Global.NOW_TIME >= Global.GAME_END_TIME)        // 比赛结束
        //        {
        //            if(Global.resultLayer)
        //            {
        //                Global.resultLayer.clear();
        //                Global.resultLayer = null;
        //            }
        //            Global.GlobalTimerStop();
        //            Global.Init();
        //            Transport.getInstance().sendHttpReqStart();
        ////            // 请求马的数据
        ////            if(Global.CountDownLayer == null) {
        ////                Global.CountDownLayer = new CountDownLayer();
        ////                Global.ROOT.addChild(Global.CountDownLayer);
        ////            }
        ////            // 手动修改结束后请求手动修改的结果
        ////            if(!Global.HAS_SEND_HTTP1) {
        ////                Transport.getInstance().sendHttpReq1();
        ////                Global.HAS_SEND_HTTP1 = true;
        ////            }
        ////            
        ////            status = Global.GAMEENDSTR;
        ////            Global.CURRENT_STATUS = status;
        ////            if(Global.Gaming && Global.HAS_RECEIVE_HTTP && Global.HAS_RECEIVE_HTTP1)// 收到了马的数据和人工修改的数据之后
        ////            {
        ////                Global.Gaming = false;
        ////                Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.GAME_END_STRING));
        ////            }
        //        }
    };
    //    public static URL: string = "http://192.168.2.172:8080/race/race/race";
    //    public static URL1: string = "http://192.168.2.172:8080/race/race/result";
    //    public static URLSTART: string = "http://192.168.2.172:8080/race/race/race";// 比赛开始时请求
    Global.URL = "http://fengjie888.gotoip2.com/race/race/race"; // 手动控制后请求
    //    public static URLSTART: string = "http://www.saimaba.net/race/race/begin";// 比赛开始时请求
    Global.URLSTART = "http://fengjie888.gotoip2.com/race/race/race"; // 比赛开始时请求
    Global.URL1 = "http://fengjie888.gotoip2.com/race/race/result"; // 比赛结果请求地址
    Global.SERVER_IP = "192.168.0.122";
    //    public static SERVER_IP: string = "192.168.4.168";
    Global.SERVER_PORT = 1900;
    //    public static SERVER_PORT: number = 420;
    // 每行马间隔
    Global.HORSE_GAP = 80;
    // 地面图片宽度
    Global.GOUND_WIDTH = 550;
    //    public static GOUND_WIDTH = 459;
    // 地面图片高度
    Global.GOUND_HEIGHT = 397;
    // 顶部高度
    Global.TOP_HEIGHT = 30;
    // 地面运动速度
    Global.GROUND_SPEED = 103; //px / s
    // 运动加成
    Global.RUN_SPEED_ADD = 3;
    // 玩家数量
    Global.PLAYER_CNT = 8;
    // 玩家位置
    Global.PLAYER_POS = [307.5, 283.5, 259.5, 235.5, 211.5, 187.5, 163.5, 139.5];
    // 排名情况
    Global.RANK_LIST = null;
    Global.PLAYER_STATUS_WAIT = "player_status_wait";
    Global.PLAYER_STATUS_RUN = "player_status_run";
    // 开始比赛
    Global.GAME_START_STRING = "gameStart";
    // 比赛结束
    Global.GAME_END_STRING = "gameEnd";
    // 收到比赛历史记录
    Global.HISTORY_RECEIVE = "HistoryList_receive";
    // 是否在比赛中
    Global.Gaming = false;
    ///////////////////////时间相关   下注--------人工修改--------预告结束------比赛阶段-------比赛结束
    // 比赛期数
    Global.GAME_NO = 0;
    // 当前时间
    Global.NOW_TIME = 0;
    // 下注截止时间
    Global.XIAZHU_ENDTIME = 0;
    // 人工修改截止时间
    Global.MANUAL_MODIFY_ENDTIME = 0;
    // 每段速度的时间
    Global.PIECE_TIME = 0;
    // 比赛开始时间
    Global.GAME_STARE_TIME = 0;
    // 跑步结束时间
    Global.RUN_END_TIME = 0;
    // 比赛结束时间
    Global.GAME_END_TIME = 0;
    ////////////////////////////URL请求相关   http请求马的数据  http1请求人工修改数据
    Global.HAS_SEND_HTTP = false;
    Global.HAS_SEND_HTTP1 = false;
    Global.HAS_RECEIVE_HTTP = false; // 是否收到了马的数据
    Global.HAS_RECEIVE_HTTP1 = false; // 是否收到了人工修改的数据
    Global.HORSE_TMP_DATALIST = new Array(); // 储存http请求马的数据
    Global.MANUAL_FIRST_ID = -1; // 手工改动的第一名
    //////////////////////////当前状态
    Global.CURRENT_STATUS = ""; // 当前状态
    Global.XIAZHU_STR = "xiazhu"; // 下注阶段
    Global.MANUAL_MODIFY_STR = "manualModify"; // 人工修改阶段
    Global.GAMEPRE_STR = "gamePre"; // 预告阶段
    Global.GAMEINGSTR = "gameing"; // 比赛阶段
    Global.SHOWRANKSTR = "showRank"; // 跑步结束
    Global.GAMEENDSTR = "gameEnd"; // 比赛结束
    Global.RESTSTR = "restString"; // 休息
    Global.PREGAMESTATUS = "preGameStatus"; // 倒计时阶段
    // 总路程
    Global.TOTAL_DISTANCE = 4000;
    Global.gameEventDispatcher = null;
    Global.ROOT = null;
    Global.MAINSCENE_ROOT = null;
    //    public static CountDownLayer: CountDownLayer = null;
    Global.mainScene = null;
    Global.resultLayer = null;
    Global.topLayer = null; // 顶部层
    Global.rankLayer = null; // 排名层
    Global.bottomLayer = null; // 底部层
    Global.historyPanel = null;
    // 跑步音乐
    Global.RUNSOUND = null;
    Global.ROUNDSOUNDCHANAGERL = null;
    //    public static rizhipanel:Rizhi = null;
    // 比赛历史
    Global.historyList = new Array();
    Global.timestamp = 0;
    Global.globalTimerHd = function (timestamp) {
        Global.NOW_TIME += (timestamp / 1000);
        Global.timestamp = timestamp;
        if (Global.Gaming && Global.mainScene) {
            Global.mainScene.onTimer(null);
        }
        Global.GlobalTimerHandler();
        return false;
    };
    return Global;
})();
egret.registerClass(Global,'Global');
//# sourceMappingURL=Global.js.map