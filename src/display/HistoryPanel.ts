/**
 *
 * @author 
 *
 */
class HistoryPanel extends egret.DisplayObjectContainer{
    
    private urlLoader:egret.URLLoader = null;
    private request:egret.URLRequest = null;
    
    private historyContainer:egret.DisplayObjectContainer;
    
	public constructor() {
    	super();
    	this.init();
	}
	
	private init():void
	{
    	
        var bg: egret.Bitmap = Global.createBitmapByName("recordTitle");
        this.addChild(bg);
        
        var more:egret.Bitmap = Global.createBitmapByName("more");
        this.addChild(more);
        more.x = 440;
        more.y = 6;
        
        var des: egret.Bitmap = Global.createBitmapByName("recordDesc");
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
	}
	
	public Request():void
	{
//    	  console.log("request history data");
	    this.urlLoader.load(this.request);
	}
	
    private onCompltetHandler(e:egret.Event):void
	{
        var loader: egret.URLLoader = <egret.URLLoader>e.target;
        var data: egret.URLVariables = loader.data;
        var result: string = data.toString();
        var dataObj: any = JSON.parse(result);
//        console.log("receive history data :" + result);
        
        this.updateHistoryList(dataObj);
        
        Global.gameEventDispatcher.dispatchEvent(new egret.Event(Global.HISTORY_RECEIVE));
        
        this.refresh();
	}
	
	private updateHistoryList(data:any):void
	{
    	  Global.historyList.length = 0;
    	
        var resultList: Array<any> = <Array<any>>data;
//        resultList.sort(this.sort);

        for(var i: number = 0;i < resultList.length;i++) 
        {
            var lite: any = resultList[i];
//            if(Global.NOW_TIME >= lite.finish) {
                Global.historyList.push(lite);
//            }
//            else 
//            {
//                console.log("不满足不满足不满足sssssssssssssssssssssssss now:" + Global.NOW_TIME + " finish:" + lite.finish);
//            }
        }
	}
	
	private refresh():void
	{
    	  this.historyClear();
//        var resultList:Array<any> = <Array<any>>data;
//        resultList.sort(this.sort);
//        var currentIndex:number = 0;
        
	    for(var i:number = 0; i < Global.historyList.length; i ++)
        {
            var lite:any = Global.historyList[i];
//            if(Global.NOW_TIME >= lite.finish)
//            {
                var historyLite:HistoryLite = new HistoryLite(i, lite);
                this.historyContainer.addChild(historyLite);
                historyLite.y = i * 20;
//                currentIndex ++;
//            }
//            else
//            {
//                console.log("不满足不满足不满足sssssssssssssssssssssssss");
//            }
        }
	}
	
	private sort(param1:any, param2:any):number
	{
        if(param1.finish > param2.finish)
        {
            return -1;
        }
        else
        {
            return 1;
        }
	}
	
	private historyClear():void
	{
	    while(this.historyContainer.numChildren)
        {
            this.historyContainer.removeChildAt(0);
        }
	}
	
	private clear():void
	{
    	  this.historyClear();
	    while(this.numChildren > 0)
        {
            this.removeChildAt(0);
        }
	}
	
    private ioErrorHandler(e:egret.IOErrorEvent):void
    {
//        console.log("request history data error");
    }
}
