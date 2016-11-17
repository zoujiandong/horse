/**
 *  运动数据
 * @author zoujiandong
 *
 */
class PlayerRunData 
{
    // 速度数组
    public speedList:Array<number> = null;
    // 时间数组
    public timeList:Array<number> = null;
    // 需要的时间
    public needTime:number = 0;
    
	public constructor() 
	{
        
	}
	
	public updateData(spdList:Array<number>, tList:Array<number>, needT:number)
	{
	    if(this.speedList == null) 
	    {
	        this.speedList = new Array<number>();
	    }
	    
	    if(this.timeList == null)
        {
            this.timeList = new Array<number>();
        }
        
        this.speedList.length = 0;
        this.timeList.length = 0;
        
        var i:number = 0;
        for(i = 0; i < spdList.length; i ++)
        {
            this.speedList[i] = spdList[i];
        }
        
        for(i = 0; i < tList.length; i ++)
        {
            this.timeList[i] = tList[i];
        }
        
        this.needTime = needT;
	}
}
