/**
 * 结果展示界面
 * @author zoujiandong
 *
 */
class GameResultLayer extends egret.DisplayObjectContainer
{
//    private confirmBtn:egret.Sprite;
    
    private firstHorse:egret.Bitmap;
    private secondHorse:egret.Bitmap;
    private thirdHorse:egret.Bitmap;
    
	public constructor() 
	{
    	super();
    	
    	this.init();
	}
	
	private init():void
	{
	    var bg:egret.Bitmap = Global.createBitmapByName("resultBG");
	    this.addChild(bg);
	    
	    var finalReult:Array<number> = PlayerRunDataManager.getFinalResult();
	    
//	    var tf1:egret.TextField = new egret.TextField();
//	    tf1.size = 30;
//	    tf1.text = finalReult[0].toString();
//	    this.addChild(tf1);
//	    tf1.x = 100;
//	    tf1.y = 100;
//	    
//        var tf2: egret.TextField = new egret.TextField();
//        tf2.size = 30;
//        tf2.text = finalReult[1].toString();
//        this.addChild(tf2);
//        tf2.x = 100;
//        tf2.y = 150;
//        
//        var tf3: egret.TextField = new egret.TextField();
//        tf3.size = 30;
//        tf3.text = finalReult[2].toString();
//        this.addChild(tf3);
//        tf3.x = 100;
//        tf3.y = 200;
        
        this.firstHorse = Global.createBitmapByName("horsePic" + finalReult[0]);
        this.firstHorse.x = 240;
        this.firstHorse.y = 170;
        this.secondHorse = Global.createBitmapByName("horsePic" + finalReult[1]);
        this.secondHorse.x = 80;
        this.secondHorse.y = 170;
        this.thirdHorse = Global.createBitmapByName("horsePic" + finalReult[2]);
        this.thirdHorse.x = 400;
        this.thirdHorse.y = 170;
        this.addChild(this.firstHorse);
        this.addChild(this.secondHorse);
        this.addChild(this.thirdHorse);
        
        var tw = egret.Tween.get(this.firstHorse, {loop:false});
        tw.to({scaleX:1.2, scaleY:1.2}, 1000, egret.Ease.sineIn);
        
        var tw1 = egret.Tween.get(this.secondHorse,{ loop: false });
        tw1.to({ scaleX: 0.8,scaleY: 0.8 },1000,egret.Ease.sineIn);
        
        var tw2 = egret.Tween.get(this.thirdHorse,{ loop: false });
        tw2.to({ scaleX: 0.8,scaleY: 0.8 },1000,egret.Ease.sineIn);
        
        var tw = egret.Tween.get(this.firstHorse,{ loop: false });
        tw.to({ scaleX: 1.2,scaleY: 1.2 },1000,egret.Ease.sineIn);
        
        var first:egret.Bitmap = Global.createBitmapByName("first");
        var second:egret.Bitmap = Global.createBitmapByName("second");
        var third:egret.Bitmap = Global.createBitmapByName("third");
        first.x = 240;
        first.y = 49;
        
        second.x = 80;
        second.y = 70;
        third.x = 400;
        third.y = 70;
        this.addChild(first);
        this.addChild(second);
        this.addChild(third);
        
//        this.confirmBtn = new egret.Sprite();
//        this.confirmBtn.graphics.clear();
//        this.confirmBtn.graphics.beginFill(0xff0000);
//        this.confirmBtn.graphics.drawRect(0, 0, 50, 30);
//        this.confirmBtn.graphics.endFill();
//        this.addChild(this.confirmBtn);
//        this.confirmBtn.x = (this.width - this.confirmBtn.width) / 2;
//        this.confirmBtn.y = 250;
//        
//        this.confirmBtn.touchEnabled = true;
//        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
	}
	
//	private touchEndHandler(e:egret.TouchEvent):void
//	{
//	    Global.Init();
//	    
//	    this.clear();
//	}
	
	public clear():void
	{
//	    if(this.confirmBtn)
//        {
//            if(this.confirmBtn.hasEventListener(egret.TouchEvent.TOUCH_END))
//            {
//                this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
//            }
//            if(this.confirmBtn.parent) this.confirmBtn.parent.removeChild(this.confirmBtn);
//            this.confirmBtn = null;
//        }
        
        while(this.numChildren)
        {
            this.removeChildAt(0);
        }
        
        this.parent.removeChild(this);
	}
}
