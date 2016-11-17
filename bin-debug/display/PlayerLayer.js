/**
 * 人物层
 * @author zoujiandong
 *
 */
var PlayerLayer = (function (_super) {
    __extends(PlayerLayer, _super);
    function PlayerLayer() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=PlayerLayer,p=c.prototype;
    p.init = function () {
        this.playerList = new Array();
        var player;
        for (var i = Global.PLAYER_CNT - 1; i >= 0; i--) {
            player = new Player(i + 1);
            this.playerList.push(player);
            //            player.speed = 10 + Math.random() * 5 * 0.1;
            this.addChild(player);
            player.x = -((Global.PLAYER_CNT - 1) - i) * 5;
            player.y = Global.PLAYER_POS[i];
        }
    };
    p.gameStartHandler = function () {
        for (var i = 0; i < Global.PLAYER_CNT; i++) {
            this.playerList[i].gameStartHandler();
        }
    };
    p.gameEndHandler = function () {
        for (var i = 0; i < Global.PLAYER_CNT; i++) {
            this.playerList[i].gameEndHandler();
        }
    };
    p.onTimer = function () {
        var player;
        for (var i = 0; i < this.playerList.length; i++) {
            player = this.playerList[i];
            player.onTimer();
        }
    };
    p.efHandler = function (e) {
        var player;
        for (var i = 0; i < this.playerList.length; i++) {
            player = this.playerList[i];
            player.distance += player.speed;
            player.x -= (player.speed - Global.GROUND_SPEED);
        }
    };
    p.updatePlayerData = function () {
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].updateData();
        }
    };
    p.clear = function () {
        if (this.playerList) {
            if (this.playerList.length > 0) {
                for (var i = 0; i < this.playerList.length; i++) {
                    this.playerList[i].clear();
                }
                this.playerList.length = 0;
            }
            this.playerList = null;
        }
    };
    return PlayerLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(PlayerLayer,'PlayerLayer');
//# sourceMappingURL=PlayerLayer.js.map