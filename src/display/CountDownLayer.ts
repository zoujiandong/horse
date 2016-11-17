/**
 * 倒计时层
 * @author zoujiandong
 *
 */
class CountDownLayer extends egret.DisplayObjectContainer
{
    
    private timer:egret.Timer = null;
    private tf:egret.TextField = null;
    private bg:egret.Bitmap = null;
    private isShow:Boolean = true;
    
    private static _instance:CountDownLayer =null;
    
    public static getInstance():CountDownLayer
    {
        if(!CountDownLayer._instance)
        {
            CountDownLayer._instance = new CountDownLayer();
        }
        return CountDownLayer._instance;
    }
    
	public constructor() 
	{
    	  super();
    	  
    	
    	  this.init();
	}
	
	private init():void
	{
        this.bg = Global.createBitmapByName("countdown");
        this.addChild(this.bg);
        this.bg.x = (Global.STAGE_WIDTH - this.bg.width) / 2;
        this.bg.y = 214 - 10;

        this.tf = new egret.TextField();
        this.addChild(this.tf);
        this.tf.size = 25;
        this.tf.textColor = 0xff0000;
        this.tf.x = (Global.STAGE_WIDTH - this.tf.textWidth) / 2;
        this.tf.y = 230;
        
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        
        Global.ROOT.addChild(this);
        
        this.hide();
	}

	public show():void
	{
    	if(!this.isShow)
     {
            this.visible = true;
            this.timer.start();
            this.isShow = true;
     }
	}
	
	public hide():void
	{
    	if(this.isShow)
     {
            this.visible = false;
            this.timer.stop();
            this.isShow = false;
     }
    	  
	}
	
	private onTimer(e:egret.TimerEvent):void
	{
    	 var gap:number = 0;

    	 if(Global.CURRENT_STATUS == Global.PREGAMESTATUS)
       {
            gap = Global.GAME_STARE_TIME - Global.NOW_TIME;
            this.tf.text = "倒计时：" + Math.floor(gap);
       }
       else if(Global.CURRENT_STATUS == Global.RESTSTR) 
       {
            if(this.timer && this.timer.running == true) 
            {
                this.timer.stop();
            }
            this.tf.text = "停止";
        }
       this.tf.x = (Global.STAGE_WIDTH - this.tf.width) / 2;
       this.tf.y = 230;
	}
	
//	public clear():void
//	{
//	    if(this.timer)
//        {
//            if(this.timer.running)
//            {
//                this.timer.stop();
//            }
//            if(this.timer.hasEventListener(egret.TimerEvent.TIMER))
//            {
//                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
//            }
//            this.timer = null;
//        }
//        if(this.parent)
//        {
//            this.parent.removeChild(this);
//        }
//        
//        Global.CountDownLayer = null;
//	}
}
