//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        Global.ROOT = this;
        var mainSceneContainer = new egret.DisplayObjectContainer();
        Global.MAINSCENE_ROOT = mainSceneContainer;
        Global.ROOT.addChild(Global.MAINSCENE_ROOT);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        Global.STAGE_WIDTH = this.stage.stageWidth;
        Global.STAGE_HEIGHT = this.stage.stageHeight;
        Global.GOUND_WIDTH = Global.STAGE_WIDTH;
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadError, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    p.onConfigLoadError = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadError, this);
        console.warn("load config error");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            //            console.log(event.resItem.name);
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        if (Global.gameEventDispatcher == null) {
            Global.gameEventDispatcher = new GameEventDispatcher();
            Global.gameEventDispatcher.addEventListener(Global.GAME_START_STRING, this.startGame, this);
            Global.gameEventDispatcher.addEventListener(Global.GAME_END_STRING, this.endGame, this);
            Global.gameEventDispatcher.addEventListener(Global.HISTORY_RECEIVE, this.historyReceiveHandler, this);
        }
        //        Global.historyPanel.Request();
        if (Global.RUNSOUND == null) {
            Global.RUNSOUND = RES.getRes("runSound");
        }
        Global.Init();
        Global.topLayer = new TopLayer();
        Global.ROOT.addChild(Global.topLayer);
        Global.rankLayer = new RankLayer();
        Global.ROOT.addChild(Global.rankLayer);
        Global.rankLayer.x = 120;
        Global.rankLayer.y = 15;
        Global.bottomLayer = new BottomLayer();
        Global.ROOT.addChild(Global.bottomLayer);
        Global.bottomLayer.y = Global.TOP_HEIGHT + Global.GOUND_HEIGHT;
        Global.historyPanel = new HistoryPanel();
        Global.ROOT.addChild(Global.historyPanel);
        Global.historyPanel.x = 0;
        Global.historyPanel.y = 490;
        //        Global.rizhipanel = new Rizhi();
        //        Global.ROOT.addChild(Global.rizhipanel);
        //        Global.rizhipanel.x = 0;
        //        Global.rizhipanel.y = 60;
        //        Transport.getInstance().InitSocket();
        Transport.getInstance().InitHTTP();
        Transport.getInstance().sendHttpReqStart();
        //        Transport.getInstance().sendHttpReq();
        //        Global.Init();
        //        Global.FreshGameTime(0,100,100 + 8 + 10 + 15 + 22);
        //        // 初始化比赛数据
        //        Global.initPlayerRunDataList();
        //        
        //        Global.initGlobalTimer();
        //        
        //        this.mainScene = new MainScene();
        //        this.addChild(this.mainScene);
        //        
        //        Global.GlobalTimerStart();
        //        
        //        if(Global.NOW_TIME < Global.GAME_STARE_TIME)
        //        {
        //            Global.CountDownLayer = new CountDownLayer();
        //            this.addChild(Global.CountDownLayer);
        //        }
    };
    p.startGame = function (e) {
        Global.mainScene.startTimer();
        Global.topLayer.hideCurrent();
        Global.topLayer.updateLastToCurrent();
        Global.bottomLayer.updateLastToCurrent();
        var sound = RES.getRes("startSound");
        sound.play(0, 1);
        Global.ROUNDSOUNDCHANAGERL = Global.RUNSOUND.play();
    };
    p.endGame = function (e) {
        if (Global.ROUNDSOUNDCHANAGERL) {
            Global.ROUNDSOUNDCHANAGERL.stop();
            Global.ROUNDSOUNDCHANAGERL = null;
        }
        //        Global.GlobalTimerStop();
        Global.mainScene.stopTimer();
        //        console.log("player result:" + Global.mainScene.getPlayerDisStr());
        Global.MAINSCENE_ROOT.removeChild(Global.mainScene);
        Global.mainScene = null;
        if (!Global.resultLayer) {
            Global.resultLayer = new GameResultLayer();
        }
        Global.MAINSCENE_ROOT.addChild(Global.resultLayer);
        Global.resultLayer.y = Global.TOP_HEIGHT;
        Global.rankLayer.refreshGameEnd();
        Global.topLayer.hideCurrent();
        Global.topLayer.updateLastToCurrent();
        Global.bottomLayer.updateLastToCurrent();
    };
    p.historyReceiveHandler = function (e) {
        Global.bottomLayer.updateLast();
        Global.rankLayer.updateLastRank();
        Global.topLayer.updateLast();
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map