/**
 *
 * @author
 *
 */
var HistoryPanel = (function (_super) {
    __extends(HistoryPanel, _super);
    function HistoryPanel() {
        _super.call(this);
        this.urlLoader = null;
        this.request = null;
        this.init();
    }
    var d = __define,c=HistoryPanel,p=c.prototype;
    p.init = function () {
        var bg = Global.createBitmapByName("recordTitle");
        this.addChild(bg);
        var more = Global.createBitmapByName("more");
        this.addChild(more);
        more.x = 440;
        more.y = 6;
        var des = Global.createBitmapByName("recordDesc");
        this.addChild(des);
        des.x = 0;
        des.y = bg.y + bg.height;
        this.historyContainer = new egret.DisplayObjectContainer();
        this.addChild(this.historyContainer);
        this.historyContainer.x = 0;
        this.historyContainer.y = des.y + des.height;
        this.urlLoader = new egret.URLLoader();
        this.urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onCompltetHandler, this);
        this.urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
        this.request = new egret.URLRequest();
        this.request.url = Global.URL1;
        this.request.method = egret.URLRequestMethod.GET;
    };
    p.Request = function () {
        //    	  console.log("request history data");
        this.urlLoader.load(this.request);
    };
    p.onCompltetHandler = function (e) {
        var loader = e.target;
        var data = loader.data;
        var result = data.toString();
        var dataObj = JSON.parse(result);
        //        console.log("receive history data :" + result);
        this.updateHistoryList(dataObj);
        Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.HISTORY_RECEIVE));
        this.refresh();
    };
    p.updateHistoryList = function (data) {
        Global.historyList.length = 0;
        var resultList = data;
        //        resultList.sort(this.sort);
        for (var i = 0; i < resultList.length; i++) {
            var lite = resultList[i];
            //            if(Global.NOW_TIME >= lite.finish) {
            Global.historyList.push(lite);
        }
    };
    p.refresh = function () {
        this.historyClear();
        //        var resultList:Array<any> = <Array<any>>data;
        //        resultList.sort(this.sort);
        //        var currentIndex:number = 0;
        for (var i = 0; i < Global.historyList.length; i++) {
            var lite = Global.historyList[i];
            //            if(Global.NOW_TIME >= lite.finish)
            //            {
            var historyLite = new HistoryLite(i, lite);
            this.historyContainer.addChild(historyLite);
            historyLite.y = i * 20;
        }
    };
    p.sort = function (param1, param2) {
        if (param1.finish > param2.finish) {
            return -1;
        }
        else {
            return 1;
        }
    };
    p.historyClear = function () {
        while (this.historyContainer.numChildren) {
            this.historyContainer.removeChildAt(0);
        }
    };
    p.clear = function () {
        this.historyClear();
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    };
    p.ioErrorHandler = function (e) {
        //        console.log("request history data error");
    };
    return HistoryPanel;
})(egret.DisplayObjectContainer);
egret.registerClass(HistoryPanel,'HistoryPanel');
//# sourceMappingURL=HistoryPanel.js.map