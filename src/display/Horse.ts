/**
 *
 * @author 
 *
 */
class Horse extends egret.DisplayObjectContainer
{
    
    private index: number;
    private res: string;
    private mc: egret.MovieClip;
    private indexTF:egret.TextField;
    
	public constructor(index:number) 
	{
        super();
        
        this.index = index;
        
        this.res = "man1";
        
        this.init();
	}
	
	private init():void
	{
        var res: string = this.res + "_json";
        var data = RES.getRes(res);
        var texture = RES.getRes("man1");
        var mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.mc = new egret.MovieClip(mcf.generateMovieClipData("man1"));
        this.addChild(this.mc);
        
        this.indexTF = new egret.TextField();
//        this.indexTF.textColor = 0xff0000;
        this.indexTF.size = 100;
        this.indexTF.text = "" + this.index;
        this.addChild(this.indexTF);
        
        this.mc.addEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        this.mc.play();
	}
	
	private efHandler(e:egret.Event):void
	{
	    if(this.mc.currentFrame == this.mc.totalFrames)
         {
            this.mc.gotoAndPlay(1);
         }
	}
}
