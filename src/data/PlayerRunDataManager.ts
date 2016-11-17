/**
 * 运动数据
 * @author zoujiandong
 *
 */
class PlayerRunDataManager
{
	public static playerRunDataList:Array<PlayerRunData> = new Array<PlayerRunData>();
	
	// 清理数据
	public static clearPlayerRunDataList():void
	{
	    if(PlayerRunDataManager.playerRunDataList.length > 0)
        {
            PlayerRunDataManager.playerRunDataList.length = 0;
        }
	}
	// 初始化
	public static initPlayerRunDataList():void
	{
	    for(var i:number = 0; i < Global.PLAYER_CNT; i ++)
        {
            var playerRunData:PlayerRunData = new PlayerRunData();
            PlayerRunDataManager.playerRunDataList.push(playerRunData);
        }
	}
	// 更新某个玩家的运动数据
    public static updatePlayerRunDataList(index: number,tList: Array<number>, spdList:Array<number>, needTime:number)
	{
	    var playerRunData:PlayerRunData = PlayerRunDataManager.playerRunDataList[index];
	    playerRunData.updateData(spdList, tList, needTime);
	}
	
	public static getFinalResult():Array<number>
	{
	    var result:Array<number> = new Array<number>();
	    
	    var tmpList:Array<Object> = new Array<Object>();
	    var obj:Object;
	    for(var i:number = 0; i < PlayerRunDataManager.playerRunDataList.length; i ++)
        {
            obj = new Object();
            tmpList.push(obj);
            obj["index"] = i + 1;
//            var distance:number = 0;
//            for(var j:number = 0; j < PlayerRunDataManager.playerRunDataList[i].timeList.length; j ++)
//            {
//                distance += (PlayerRunDataManager.playerRunDataList[i].timeList[j] * PlayerRunDataManager.playerRunDataList[i].speedList[j]);
//            }
//            obj["distance"] = distance;
            var needTime:number = PlayerRunDataManager.playerRunDataList[i].needTime;
            obj["needTime"] = needTime;
        }
        
        
        var str:string = "";
        for(i = 0; i < tmpList.length; i ++)
        {
            str += ("index:" + tmpList[i]["index"] + " needTime:" + tmpList[i]["needTime"]);
        }
//        console.log("final result:" + str);
        
        
        tmpList.sort(PlayerRunDataManager.sortFun);
        for(i = 0; i < tmpList.length; i ++)
        {
            result.push(tmpList[i]["index"]);
        }
	    return result;
	}
	
	private static sortFun(a:Object, b:Object):number
	{
        if(a["needTime"] < b["needTime"])
        {
            return -1
        }
        else
        {
            return 1;
        }
	}
}
