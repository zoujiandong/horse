
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"bin-debug/data/PlayerRunData.js",
	"bin-debug/data/PlayerRunDataManager.js",
	"bin-debug/display/BottomLayer.js",
	"bin-debug/display/CountDownLayer.js",
	"bin-debug/display/EndLine.js",
	"bin-debug/display/GameResultLayer.js",
	"bin-debug/display/Ground.js",
	"bin-debug/display/HistoryLite.js",
	"bin-debug/display/HistoryPanel.js",
	"bin-debug/display/Horse.js",
	"bin-debug/display/Player.js",
	"bin-debug/display/PlayerLayer.js",
	"bin-debug/display/RankLayer.js",
	"bin-debug/display/Rizhi.js",
	"bin-debug/display/scene/MainScene.js",
	"bin-debug/display/TopLayer.js",
	"bin-debug/GameEventDispatcher.js",
	"bin-debug/Global.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Transport.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 550,
		contentHeight: 220,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};