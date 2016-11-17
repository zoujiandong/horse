/**
 *
 * @author 底部层
 *
 */
class BottomLayer extends egret.DisplayObjectContainer{
    private currentTF:egret.TextField = null;
    private firstTF:egret.TextField = null;
    private bigTF:egret.TextField = null;
    private coupleTF:egret.TextField = null;
    
	public constructor() {
    	super();
    	this.init();
	}
	
	private init():void
	{
        var bg: egret.Bitmap = Global.createBitmapByName("buttombg");
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
	}
	public updateLastToCurrent():void
	{
    	  
        var dateStr:string = this.convertToDateStr(Global.GAME_END_TIME);
        var qiStr:string = Global.GAME_NO + "";
        
        this.currentTF.text = dateStr + "    " + qiStr;
        var resultList: Array<number> = PlayerRunDataManager.getFinalResult();
        
        var firstIndex:number = -1;
        firstIndex = resultList[0];
        
        // 第一名
        if(firstIndex != -1) {
            var isBig: Boolean;
            var isCouple: Boolean;
            if(firstIndex <= 4) {
                // 小
                isBig = false;
            }
            else {
                // 大
                isBig = true;
            }

            if(firstIndex % 2 == 0) {
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
            if(isBig) {
                this.bigTF.textColor = 0xf2248b;
                this.bigTF.text = "大";
            }
            else {
                this.bigTF.textColor = 0x53a0ec;
                this.bigTF.text = "小";
            }
            // 单 双
            if(isCouple) {
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
        
	    if(Global.Gaming)
        {
            this.firstTF.text = "";
            this.bigTF.text = "";
            this.coupleTF.text = "";
        }
	}
	// 准备阶段显示上场比赛的结果
	public updateLast():void
	{
        if(Global.CURRENT_STATUS == Global.PREGAMESTATUS || Global.CURRENT_STATUS == Global.RESTSTR)
        {
            if(Global.historyList.length > 0) {
                var historyLast: any = Global.historyList[0];
            
                var dateStr:string = this.convertToDateStr(historyLast.finish);
                // 期数
                this.currentTF.textColor = 0x94756b;
                this.currentTF.text = dateStr + "   " + historyLast.no;

                var firstIndex: number = -1;
                // 马排名
                var horses: Array<any> = historyLast.horses;
                if(horses && horses.length > 0) {
                    firstIndex = (horses[0].id + 1);
                }
                // 第一名
                if(firstIndex != -1) {
                    var isBig: Boolean;
                    var isCouple: Boolean;
                    if(firstIndex <= 4) {
                        // 小
                        isBig = false;
                    }
                    else {
                        // 大
                        isBig = true;
                    }

                    if(firstIndex % 2 == 0) {
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
                    if(isBig) {
                        this.bigTF.textColor = 0xf2248b;
                        this.bigTF.text = "大";
                    }
                    else {
                        this.bigTF.textColor = 0x53a0ec;
                        this.bigTF.text = "小";
                    }
                    // 单 双
                    if(isCouple) {
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
	    
	}
	
	private convertToDateStr(time:number):string
	{
	    var str:string = "";
	    
        var finishTime: number = time;
        var d: Date = new Date(finishTime * 1000);
        var year: number = d.getFullYear();
        var month: number = d.getMonth() + 1;
        var date: number = d.getDate();
        var hour: number = d.getHours();
        var minute: number = d.getMinutes();
        var second: number = d.getSeconds();
        var day: number = d.getDay();

        var yearStr:string = year + "";
        var monthStr: string = month >= 10 ? "" + month : "0" + month;
        var dateStr: string = date >= 10 ? "" + date : "0" + date;
        var hourStr: string = hour >= 10 ? "" + hour : "0" + hour;
        var minuteStr: string = minute >= 10 ? "" + minute : "0" + minute;
        var secondStr: string = second >= 10 ? "" + second : "0" + second;

        str = yearStr + "-" + monthStr + "-" + dateStr + "  "
        + hourStr + ":" + minuteStr + ":" + secondStr;
        
	    return str;
	}
	
	public clear():void
	{
	    
	}
}
