/**
 * socket
 * @author zoujiandong
 *
 */
var Transport = (function () {
    function Transport() {
        this.webSocket = null;
        this.urlLoaderStart = null;
        this.urlLoader = null;
        this.urlLoader1 = null;
    }
    var d = __define,c=Transport,p=c.prototype;
    Transport.getInstance = function () {
        if (Transport._instance == null) {
            Transport._instance = new Transport();
        }
        return Transport._instance;
    };
    p.InitSocket = function () {
        if (this.webSocket == null) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.type = egret.WebSocket.TYPE_STRING;
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        }
    };
    p.InitHTTP = function () {
        if (this.urlLoaderStart == null) {
            this.urlLoaderStart = new egret.URLLoader();
            this.urlLoaderStart.dataFormat = egret.URLLoaderDataFormat.TEXT;
            this.urlLoaderStart.addEventListener(egret.Event.COMPLETE, this.onHttpGetCompleteStart, this);
            this.urlLoaderStart.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpGetErrorStart, this);
        }
        if (this.urlLoader == null) {
            this.urlLoader = new egret.URLLoader();
            this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onHttpGetComplete, this);
            this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpGetError, this);
        }
        if (this.urlLoader1 == null) {
            this.urlLoader1 = new egret.URLLoader();
            this.urlLoader1.dataFormat = egret.URLLoaderDataFormat.TEXT;
            this.urlLoader1.addEventListener(egret.Event.COMPLETE, this.onHttpGetComplete1, this);
            this.urlLoader1.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpGetError1, this);
        }
    };
    p.sendHttpReqStart = function (url) {
        if (url === void 0) { url = ""; }
        var requestURL = "";
        if (url == "") {
            url = Global.URLSTART;
        }
        requestURL = url;
        var request = new egret.URLRequest();
        request.url = requestURL;
        request.method = egret.URLRequestMethod.GET;
        this.urlLoaderStart.load(request);
        //        console.log("request http start:" + request.url);
        //        console.log("第一次请求数据");
        //        Global.rizhipanel.update("第一次请求数据");
    };
    p.sendHttpReq = function (url) {
        if (url === void 0) { url = ""; }
        var requestURL = "";
        if (url == "") {
            url = Global.URL;
        }
        requestURL = url;
        var request = new egret.URLRequest();
        request.url = requestURL;
        request.method = egret.URLRequestMethod.GET;
        this.urlLoader.load(request);
        //        console.log("request http :" + request.url);
        //        console.log("第二次请求数据");
        //        Global.rizhipanel.update("       第二次请求数据");
    };
    p.sendHttpReq1 = function (url) {
        if (url === void 0) { url = ""; }
        var requestURL = "";
        if (url == "") {
            url = Global.URL1;
        }
        requestURL = url;
        var request = new egret.URLRequest();
        request.url = requestURL;
        //        request.method = egret.URLRequestMethod.GET;
        this.urlLoader1.load(request);
        //        console.log("request http :" + request.url);
    };
    p.onReceiveHorsesDataHandler = function (data) {
        var currentTime = data.now; // 当前时间
        var xiazhuEndTime = data.betEnd; // 下注结束时间
        var controlEnd = data.controlEnd; // 手动控制结束时间
        var startTime = data.preEnd; // 比赛开始时间
        var finishTime = data.finish; // 比赛结束时间
        var runEndTime = finishTime; // 跑步结束时间
        var totalDistance = data.len; // 总距离
        var pieceTime = data.pieceTime; // 每段速度时间
        var no = data.no; // 比赛期数
        Global.NOW_TIME = currentTime;
        Global.XIAZHU_ENDTIME = xiazhuEndTime;
        Global.MANUAL_MODIFY_ENDTIME = controlEnd;
        Global.GAME_STARE_TIME = startTime;
        Global.GAME_END_TIME = finishTime;
        Global.TOTAL_DISTANCE = totalDistance;
        Global.PIECE_TIME = pieceTime;
        Global.GAME_NO = no;
        if (data.horses && data.horses.length > 0) {
            Global.HORSE_TMP_DATALIST.length = 0;
            runEndTime = startTime + data.horses[0].speed.length * pieceTime;
            //            Global.HAS_SEND_HTTP = true;
            //            Global.HAS_RECEIVE_HTTP = true;
            for (var i = 0; i < data.horses.length; i++) {
                Global.HORSE_TMP_DATALIST.push(data.horses[i]);
            }
            Global.horseDataHandler();
        }
        Global.RUN_END_TIME = runEndTime;
    };
    // 马的数据处理
    p.onHttpGetCompleteStart = function (e) {
        //        console.log("接到第一次数据");
        //        Global.rizhipanel.update("       接到第一次数据");
        //        console.log("---------------");
        var loader = e.target;
        var data = loader.data;
        var result = data.toString();
        var dataObj = JSON.parse(result);
        //        console.log("receive http data :" + result);
        var no = dataObj.no;
        // 整天的比赛已经结束
        if (no == 0) {
            Global.CURRENT_STATUS = Global.RESTSTR;
            // 显示倒计时
            //            if(Global.CountDownLayer == null) {
            ////                Global.CountDownLayer = new CountDownLayer();
            //                Global.CountDownLayer = CountDownLayer.getInstance();
            //                Global.ROOT.addChild(Global.CountDownLayer);
            //            }
            CountDownLayer.getInstance().show();
            // 请求历史
            Global.historyPanel.Request();
        }
        else {
            this.onReceiveHorsesDataHandler(dataObj);
            //        if(dataObj.horses && dataObj.horses.length > 0)
            //        {
            //            Global.HAS_SEND_HTTP = true;
            //            Global.HAS_RECEIVE_HTTP = true;
            //        }
            //        Global.Init();
            Global.GlobalTimerHandler();
            Global.GlobalTimerStart();
            // 请求历史
            Global.historyPanel.Request();
            Global.topLayer.updateCurrent();
        }
    };
    p.onHttpGetErrorStart = function (e) {
        //        console.log("http request error :" + e.type);
        //        console.log("第一次请求数据错误");
        //        Global.rizhipanel.update("       第一次请求数据错误");
        //        console.log("---------------");
    };
    // 马的数据处理
    p.onHttpGetComplete = function (e) {
        //        console.log("接到第二次数据");
        //        Global.rizhipanel.update("       接到第二次数据");
        //        console.log("---------------");
        var loader = e.target;
        var data = loader.data;
        var result = data.toString();
        var dataObj = JSON.parse(result);
        //	    console.log("receive http1 data :" + result);
        this.onReceiveHorsesDataHandler(dataObj);
        if (dataObj.horses && dataObj.horses.length > 0) {
            Global.HAS_SEND_HTTP = true;
            Global.HAS_RECEIVE_HTTP = true;
        }
    };
    p.onHttpGetError = function (e) {
        //        console.log("第二次请求数据错误");
        //        Global.rizhipanel.update("       第二次请求数据错误");
        //        console.log("---------------");
        //	    console.log("http request1 error :" + e.type);
    };
    // 手动改动处理
    p.onHttpGetComplete1 = function (e) {
        Global.HAS_SEND_HTTP1 = true;
        Global.HAS_RECEIVE_HTTP1 = true;
        var loader = e.target;
        var data = loader.data;
        var result = data.toString();
        var dataObj = JSON.parse(result);
        //        console.log("receive http data :" + result);
        var firstId = dataObj.result;
        Global.MANUAL_FIRST_ID = firstId;
        if (Global.MANUAL_FIRST_ID != -1) {
            Global.changeRank(Global.MANUAL_FIRST_ID - 1);
        }
        Global.horseDataHandler();
    };
    p.onHttpGetError1 = function (e) {
        //        console.log("http request error :" + e.type);
    };
    p.sendMsg = function () {
        if (this.webSocket != null) {
            this.webSocket.writeUTF("a");
            this.webSocket.flush();
        }
    };
    p.onSocketConnected = function (e) {
        //        console.log("socket connected");
    };
    p.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        //        console.log("receive message :" + msg);
        var data = JSON.parse(msg);
    };
    p.onSocketClose = function (e) {
        //        console.log("socket close");
    };
    p.onSocketError = function (e) {
        //        console.log("socket error" + e.type);
    };
    Transport._instance = null;
    return Transport;
})();
egret.registerClass(Transport,'Transport');
//# sourceMappingURL=Transport.js.map