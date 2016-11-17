/**
 * 排名层
 * @author zoujiandong
 *
 */
class RankLayer extends egret.DisplayObjectContainer
{
    private numberBmpGap: number = 2;
    
    private numberBmpList: Array<egret.Bitmap>;
    
    private numberContainer: egret.DisplayObjectContainer;
    
	public constructor() 
	{
        super();
        
        this.init();
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
	}
	
	private init():void
	{
        this.numberContainer = new egret.DisplayObjectContainer();
        this.addChild(this.numberContainer);
        
        this.numberBmpList = new Array<egret.Bitmap>();
        
        var rankList: Array<number> = new Array<number>();
        for(var i: number = 0;i < Global.PLAYER_CNT; i ++)
        {
            rankList.push(i + 1);// 【1， 2， 3， 4， 5， 6， 7， 8， 9， 10】
        }
        this.render(rankList);
	}
	// 比赛结束显示当场比赛的结果
	public refreshGameEnd():void
	{
        var finalReult: Array<number> = PlayerRunDataManager.getFinalResult();
        this.render(finalReult);
	}
	// 准备阶段显示上场比赛的结果
	public updateLastRank():void
	{
        if(Global.CURRENT_STATUS == Global.PREGAMESTATUS || Global.CURRENT_STATUS == Global.RESTSTR) 
        {
            if(Global.historyList.length > 0) {
                var rankList: Array<number> = new Array<number>();

                var historyLast: any = Global.historyList[0];

                var firstIndex: number = -1;
                // 马排名
                var horses: Array<any> = historyLast.horses;
                if(horses && horses.length > 0) {
                    for(var i: number = 0;i < horses.length;i++) {
                        rankList.push(horses[i].id + 1);
                    }
                }
                if(rankList.length > 0) {
                    this.render(rankList);
                }
            }
        }
        
	}
	// 比赛中，实时显示当场比赛的结果
	private efHandler(e:egret.Event):void
	{
        if(Global.Gaming == false) return;

        var renderRank: Boolean = false;
        var tmpRankList: Array<number> = this.getRank();
        if(Global.RANK_LIST == null) {
            Global.RANK_LIST = tmpRankList;
            renderRank = true;
        }
        else {
            if(tmpRankList.toString() != Global.RANK_LIST.toString()) {
                Global.RANK_LIST = tmpRankList;
                renderRank = true;
            }
        }
        if(renderRank) {
            this.render(Global.RANK_LIST);
        }
	}
	
    private getRank(): Array<number> 
    {
        var rankList: Array<number> = new Array<number>();

        var tmpList: Array<Object> = new Array<Object>();

        var i: number = 0;
        for(i = 0;i < Global.mainScene.playerLayer.playerList.length;i++) {
            var obj: Object = new Object();
            obj["id"] = Global.mainScene.playerLayer.playerList[i].index;
            obj["dis"] = Global.mainScene.playerLayer.playerList[i].distance;
            tmpList.push(obj);
        }
        tmpList.sort(this.sortHandler);
        for(i = 0;i < tmpList.length;i++) {
            rankList.push(tmpList[i]["id"]);
        }
        return rankList;
    }
    
    private sortHandler(a: Object,b: Object): number {
        if(a["dis"] > b["dis"]) {
            return -1;
        }
        else {
            return 1;
        }
    }
	
	public render(rankList:Array<number>):void
	{
        var i: number = 0;
        var numberBmp: egret.Bitmap = null;
        if(this.numberContainer.numChildren == 0) 
        {
            for(i = 0;i < rankList.length; i ++)
            {
                numberBmp = Global.createBitmapByName("num" + rankList[i]);
                this.numberBmpList.push(numberBmp);
                numberBmp.scaleX = numberBmp.scaleY = 0.6;
                this.numberContainer.addChild(numberBmp);
            }
        }
        for(i = 0;i < rankList.length; i ++)
        {
            // 当前排名对应的图片索引
            var currentRank: number = rankList[i] - 1;
            // 对应的图片
            numberBmp = this.numberBmpList[currentRank];
            numberBmp.x = i * (numberBmp.width * numberBmp.scaleX + this.numberBmpGap);
        }
	}
	
	public clear():void
	{
    	this.removeEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
    	  this.numberBmpGap = 0;
    	  if(this.numberBmpList)
        {
           if(this.numberBmpList.length > 0)
           {
               for(var i:number = 0; i < this.numberBmpList.length; i ++)
               {   
                    this.numberBmpList[i].parent.removeChild(this.numberBmpList[i]);
               }
               this.numberBmpList.length = 0;
           }
           this.numberBmpList = null;
       }
       if(this.numberContainer)
       {
           while(this.numberContainer.numChildren > 0)
           {
               this.numberContainer.removeChildAt(0);
           }
           this.numberContainer = null;
       }
	}
}
