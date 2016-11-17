/**
 *
 * @author 
 *
 */
class Ground extends egret.DisplayObjectContainer
{
    private bgList: Array<egret.Bitmap>;
    
    private startLine:EndLine;
    private endLine:EndLine;
    
    private distance:number = 0;
    
    private runTime:number = 0;
    
    private startPos:number = 0;
    private endPos:number = 0;
    
	public constructor() 
	{
        super();
        
        this.init();
	}
	
	private init():void
	{      
        this.bgList = new Array<egret.Bitmap>();
        
        var bg1: egret.Bitmap = Global.createBitmapByName("ground");
        this.addChild(bg1);
        
        bg1.smoothing = true;
        
        var bg2: egret.Bitmap = Global.createBitmapByName("ground");
        this.addChild(bg2);
        
        bg2.smoothing = true;
        
        this.bgList.push(bg1);
        this.bgList.push(bg2);
        
        this.resetBgPos();
        
        this.startLine = new EndLine(false);
        this.addChild(this.startLine);
        this.startPos = Global.GOUND_WIDTH - Global.HORSE_GAP - (35 + 70);
        this.startLine.x = this.startPos;
        this.startLine.y = 122;
        
        this.endLine = new EndLine();
        this.addChild(this.endLine);
//        this.endPos = (-Global.TOTAL_DISTANCE) * Global.RUN_SPEED_ADD + Global.GOUND_WIDTH - Global.HORSE_GAP;
        this.endPos = (-Global.TOTAL_DISTANCE) * Global.RUN_SPEED_ADD + Global.GOUND_WIDTH - Global.HORSE_GAP - (35 + 70);
        this.endLine.x = this.endPos;
////        this.endLine.x = 0;
        this.endLine.y = 122;
        
        
        this.addEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
//        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeHandler,this);
	}
	
	public gameStartHandler():void
	{
        this.runTime = Math.max(0,Global.NOW_TIME - Global.GAME_STARE_TIME);
	}
	
	public onTimer():void
	{
        this.runTime = Math.max(0,Global.NOW_TIME - Global.GAME_STARE_TIME);
        var speed: number = Global.GROUND_SPEED * (Global.timestamp / 1000);// ms转化成s
        this.bgList[0].x += speed * Global.RUN_SPEED_ADD;
        this.bgList[1].x += speed * Global.RUN_SPEED_ADD;
        

        if(this.bgList[0].x >= (this.bgList[0].width - speed)) {
            this.bgList.reverse();
            this.resetBgPos();
        }
        
        if(this.endLine != null)
        {
            this.endLine.x = this.endPos + Global.GROUND_SPEED * Global.RUN_SPEED_ADD * this.runTime;
        }
        if(this.startLine != null)
        {
            this.startLine.x = this.startPos + Global.GROUND_SPEED * Global.RUN_SPEED_ADD * this.runTime;
            if(this.startLine.x > (Global.GOUND_WIDTH + 200))
            {
                this.removeStartLine();
            }
        }
	}
	
	public clear():void
	{
        this.removeEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeHandler,this);

        for(var i: number = 0;i < this.bgList.length;i++) 
        {
            this.removeChild(this.bgList[i]);
        }

        this.bgList.length = 0;
        
        this.removeStartLine();
        this.removeEndLine();
	}
	
	private removeStartLine():void
	{
    	  if(this.startLine)
       {
            this.startLine.clear();
            if(this.startLine.parent) 
            {
                this.startLine.parent.removeChild(this.startLine);
            }
            this.startLine = null;
       }
	}
	
	private removeEndLine():void
	{
        if(this.endLine) 
        {
            this.endLine.clear();
            if(this.endLine.parent) 
            {
                this.endLine.parent.removeChild(this.endLine);
            }
            this.endLine = null;
        }
	}
	
	private efHandler(e:egret.Event):void
	{
//        this.bgList[0].x += Global.GROUND_SPEED;
//        this.bgList[1].x += Global.GROUND_SPEED;
//        
//	    if(this.bgList[0].x >= (this.bgList[0].width - Global.GROUND_SPEED))
//         {
//            this.bgList.reverse();
//            this.resetBgPos();
//         }
         
         if(this.endLine == null)
         {
             if((Global.TOTAL_DISTANCE - this.distance) < Global.GOUND_WIDTH)
             {
//                 this.endLine = new EndLine();
//                 this.addChild(this.endLine);
//                 this.endLine.x = 0;
//                 this.endLine.y = 100;
//                 this.endLine = new egret.Sprite();
//                 this.endLine.graphics.beginFill(0xff0000);
//                 this.endLine.graphics.drawRect(0, 0, 5, 400);
//                 this.endLine.graphics.endFill();
//                 this.addChild(this.endLine);
//                 this.endLine.x = -Global.GOUND_WIDTH;
             }
             
         }
	}
	
	private removeHandler(e:egret.Event):void
	{
        this.removeEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeHandler,this);
        
        for(var i: number = 0;i < this.bgList.length; i ++)
        {
            this.removeChild(this.bgList[i]);
//            this.bgList[i].texture.dispose();
        }
        
        this.bgList.length = 0;
	}
	
	private resetBgPos():void
	{
        this.bgList[0].x = 0;
        this.bgList[0].y = 0;
        this.bgList[1].x = this.bgList[0].x - this.bgList[0].width;
        this.bgList[1].y = this.bgList[0].y;
	}
}
