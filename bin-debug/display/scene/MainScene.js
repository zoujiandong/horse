/**
 * 主场景
 * @author zoujiandong
 *
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    // 比赛是否在进行
    //    private gameing: Boolean = false;
    function MainScene() {
        _super.call(this);
        //    public timer: egret.Timer = null;
        // 地面
        this.ground = null;
        // 玩家层
        this.playerLayer = null;
        this.init();
        // 刷新排名使用
        //        this.addEventListener(egret.Event.ENTER_FRAME,this.efHandler,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    }
    var d = __define,c=MainScene,p=c.prototype;
    p.startTimer = function () {
        //        this.gameing = true;
        // 处理玩家状态
        this.playerLayer.gameStartHandler();
        // 处理地表状态
        this.ground.gameStartHandler();
        //        this.timer.start();
    };
    p.stopTimer = function () {
        //        this.gameing = false;
        // 处理玩家状态
        this.playerLayer.gameEndHandler();
        //        this.timer.stop();
    };
    p.init = function () {
        //        this.gameing = false;
        //        this.timer = new egret.Timer(Global.MAIN_SCENE_TIME);
        //        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.ground = new Ground();
        this.addChild(this.ground);
        this.ground.x = 0;
        this.ground.y = 0 + Global.TOP_HEIGHT;
        this.playerLayer = new PlayerLayer();
        this.addChild(this.playerLayer);
        this.playerLayer.x = Global.STAGE_WIDTH - 80;
        this.playerLayer.y = 15 + Global.TOP_HEIGHT;
        //        this.topLayer = new TopLayer();
        //        this.addChild(this.topLayer);
        //        
        //        this.rankLayer = new RankLayer();
        //        this.addChild(this.rankLayer);
        //        this.rankLayer.x = 120;
        //        this.rankLayer.y = 15;
        //        
        //        this.bottomLayer = new BottomLayer();
        //        this.addChild(this.bottomLayer);
        //        this.bottomLayer.y = this.ground.y + this.ground.height;
    };
    //	private efHandler(e:egret.Event):void
    //	{
    //        if(this.gameing == false) return;
    //        
    //        var renderRank: Boolean = false;
    //        var tmpRankList: Array<number> = this.getRank();
    //        if(Global.RANK_LIST == null)
    //        {
    //            Global.RANK_LIST = tmpRankList;
    //            renderRank = true;
    //        }
    //        else
    //        {
    //            if(tmpRankList.toString() != Global.RANK_LIST.toString())
    //            {
    //                Global.RANK_LIST = tmpRankList;
    //                renderRank = true;
    //            }
    //        }
    //        if(renderRank)
    //        {
    //            this.rankLayer.render(Global.RANK_LIST);
    //        }
    //	}
    p.updatePlayerData = function () {
        this.playerLayer.updatePlayerData();
    };
    p.getPlayerDisStr = function () {
        var str = "";
        for (var i = 0; i < this.playerLayer.playerList.length; i++) {
            str += ("index:" + this.playerLayer.playerList[i].index + " distance:" + this.playerLayer.playerList[i].distance);
        }
        return str;
    };
    p.onTimer = function (e) {
        //        this.ground.onTimer(Global.MAIN_SCENE_TIME);
        //        this.playerLayer.onTimer(Global.MAIN_SCENE_TIME);
        this.ground.onTimer();
        this.playerLayer.onTimer();
    };
    p.clear = function (e) {
        //    	if(this.timer)
        //         {
        //             if(this.timer.running)
        //             {
        //                 this.timer.stop();
        //             }
        //             if(this.timer.hasEventListener(egret.TimerEvent.TIMER))
        //             {
        //                 this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        //             }
        //             this.timer = null;
        //         }
        if (this.ground) {
            this.ground.clear();
            this.ground = null;
        }
        if (this.playerLayer) {
            this.playerLayer.clear();
            this.playerLayer = null;
        }
        //        if(this.topLayer)
        //        {
        //            this.topLayer.clear();
        //            this.topLayer = null;
        //        }
        //        if(this.rankLayer)
        //        {
        //            this.rankLayer.clear();
        //            this.rankLayer = null;
        //        }
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
        //        this.gameing = false;
    };
    return MainScene;
})(egret.DisplayObjectContainer);
egret.registerClass(MainScene,'MainScene');
//# sourceMappingURL=MainScene.js.map