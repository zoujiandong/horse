/**
 *
 * @author 
 *
 */
class Rizhi extends egret.DisplayObjectContainer {
    private tf: egret.TextField = null;
    public constructor() {
        super();

        this.init();
    }

    private init(): void {
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0xcccccc);
        bg.graphics.drawRect(0,0,Global.STAGE_WIDTH,50);
        bg.graphics.endFill();
        this.addChild(bg);

        this.tf = new egret.TextField();
        this.addChild(this.tf);
        this.tf.textColor = 0;
        this.tf.size = 15;
        this.tf.y = 20;
    }

    public update(str: string): void {
        this.tf.text += str;
    }

    public clear(): void {
        this.tf.text = "";
    }
}
