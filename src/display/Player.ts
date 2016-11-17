/**
 * 玩家
 * @author zoujiandong
 *
 */
class Player extends egret.DisplayObjectContainer
{
    public index: number;
    private res: string;
    private mc: egret.MovieClip;
    private status: string;
    
    public runTime:number = 0;
    public speed: number = 12;
    public distance: number = 0;
    
    private runData:PlayerRunData = null;
    
    public constructor(index: number) 
	{
        super();
        
        this.index = index;

        this.res = "horse" + this.index;
        
        this.status = Global.PLAYER_STATUS_WAIT;

        this.init();
	}
	
    private init(): void 
    {
        this.runData = PlayerRunDataManager.playerRunDataList[this.index - 1];
            
        var res: string = this.res + "_json";
        var data = RES.getRes(res);
        var texture = RES.getRes(this.res + "_png");
        var mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.mc = new egret.MovieClip(mcf.generateMovieClipData(this.res));
        this.mc.gotoAndStop(7);
        this.addChild(this.mc);

        this.mc.addEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        
        this.mc.smoothing = true;
        
        
//        var timer: egret.Timer = new egret.Timer(5000);
//        timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
//        timer.start();
    }

    private efHandler(e: egret.Event): void 
    {
        if(this.status == Global.PLAYER_STATUS_WAIT) {
            this.mc.gotoAndStop(7);
            return;
        }
        if(this.mc.currentFrame == this.mc.totalFrames) 
        {
            this.mc.gotoAndPlay(1);
        }
    }
    
    public updateData():void
    {
        this.runData = PlayerRunDataManager.playerRunDataList[this.index - 1];
    }
    
    public onTimer():void
    {
        this.runTime = Math.max(0,Global.NOW_TIME - Global.GAME_STARE_TIME);
        this.distance = this.getDistance();
        this.x = -(this.getDistance() - (Global.GROUND_SPEED * this.runTime)) * Global.RUN_SPEED_ADD;
    }
    
    public gameStartHandler():void
    {
        this.status = Global.PLAYER_STATUS_RUN;
        this.runTime = Math.max(0, Global.NOW_TIME - Global.GAME_STARE_TIME);
        this.mc.play();
    }
    
    public gameEndHandler():void
    {
        this.status = Global.PLAYER_STATUS_WAIT;
        this.mc.gotoAndStop(7);
    }
    
    public clear():void
    {
        this.mc.removeEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        
        this.index = 0;
        this.res = "";
        if(this.mc)
        {
            this.mc.stop();
            if(this.mc.parent != null)
            {
                this.mc.parent.removeChild(this.mc);
            }
            this.mc = null;
        }
        this.status = "";
        this.runTime = 0;
        this.speed = 0;
        this.distance = 0;
        this.runData = null;
    }
    
    private getDistance():number
    {
        var index:number = -1;
        var current:number = 0;
        var next:number = 0;
        var runT:number = this.runTime;
        var value:number = 0;
        
        for(var i:number = 0; i < this.runData.timeList.length; i ++)
        {
            if(runT >= this.runData.timeList[i])
            {
                value += this.runData.speedList[i] * this.runData.timeList[i];
                runT -= this.runData.timeList[i];
            }
            else
            {
                value += this.runData.speedList[i] * runT;
                break;
            }
        }
        return value;
    }
    
    private indexI:number = -1;
    private getSpeed():number
    {
        var index:number = -1;
        
        var current:number = 0;
        var next:number = 0;
        // [8, 15, 20, 30] time
        for(var i:number = 0; i < this.runData.timeList.length; i ++)
        {
            var changeSpeedTime:number = 0;
            for(var j:number = 0; j <= i; j ++)
            {
                changeSpeedTime += this.runData.timeList[j];
            }
//            if(this.runTime < this.runData.timeList[i])
            if(this.runTime < changeSpeedTime)
            {
                if(i != this.indexI)
                {
//                    console.log("currentTime:" + Global.NOW_TIME +  "   index:" + this.index + "  speed:" + this.runData.speedList[i]);
                }
                index = i;
                this.indexI = i;
                break;
            }
//            if(i == 0)
//            {
//                if(this.runTime < this.runData.timeList[0])
//                {
//                    index = 0;
//                    break;
//                }
//            }
//            else if(i < this.runData.timeList.length - 1)
//            {
//                current = this.runData.timeList[i];
//                next = this.runData.timeList[i + 1];
//                if(this.runTime >= current && this.runTime < next)
//                {
//                    index = i;
//                    break;
//                }
//            }
//            else
//            {
////                current = this.runData.timeList[i];
//                index = this.runData.timeList.length - 1;
//                break;
//            }
        }
        return this.runData.speedList[index];
    }
}
