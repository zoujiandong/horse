/**
 * 人物层
 * @author zoujiandong
 *
 */
class PlayerLayer extends egret.DisplayObjectContainer
{
    public playerList: Array<Player>;
    
	public constructor() 
	{
        super();
        
        this.init();
	}
	
	private init():void
	{
        this.playerList = new Array<Player>();
        var player: Player;
        for(var i: number = Global.PLAYER_CNT - 1;i >= 0;i--) 
        {
            player = new Player(i + 1);
            this.playerList.push(player);
//            player.speed = 10 + Math.random() * 5 * 0.1;
            this.addChild(player);
            player.x = -((Global.PLAYER_CNT - 1) - i) * 5;
            player.y = Global.PLAYER_POS[i];
        }
	}
	
	public gameStartHandler():void
	{
        for(var i: number = 0;i < Global.PLAYER_CNT;i++) 
        {
            this.playerList[i].gameStartHandler();
        }
	}
	
	public gameEndHandler():void
	{
        for(var i: number = 0;i < Global.PLAYER_CNT;i++) 
        {
            this.playerList[i].gameEndHandler();
        }
	}
	
	public onTimer():void
	{
        var player: Player;
        for(var i: number = 0;i < this.playerList.length;i++) 
        {
            player = this.playerList[i];
            player.onTimer();
        }
	}
	
	private efHandler(e:egret.Event):void
	{
        var player: Player;
        for(var i: number = 0;i < this.playerList.length; i ++)
        {
            player = this.playerList[i];
            player.distance += player.speed;
            player.x -= (player.speed - Global.GROUND_SPEED);
        }
	}
	
	public updatePlayerData():void
	{
        for(var i: number = 0;i < this.playerList.length;i++) 
        {
            this.playerList[i].updateData();
        }
	}
	
	public clear():void
	{
	    if(this.playerList)
        {
            if(this.playerList.length > 0) 
            {
                for(var i:number = 0; i < this.playerList.length; i ++)
                {
                    this.playerList[i].clear();
                }
                this.playerList.length = 0;
            }
            this.playerList = null;
        }
	}
}
