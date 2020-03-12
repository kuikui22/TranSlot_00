import { SlotEventConst } from "./SlotEventConst";
import CommonFunc from "./CommonFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    fruitNodes: cc.Node[] = [];

    _limitY: number = -320;
    _resetY: number = 320;
    _repeatTime: number = 3;
    _iconCount: number = 11;
    _iconDir: string = "fruit/";
    _resultArr: Array<number> = [];

    onLoad() {
        this.addEvents();
    }

    start() {

    }

    private addEvents(): void {
        CommonFunc.getEventNode().on(SlotEventConst.START_SCROLL, this.scrollToNumber, this);
    }

    public setResult(result_arr:Array<number>):void {
        if(!result_arr || result_arr.length === 0) {
            cc.log("the result arr isn't vaild");
            return;
        }

        this._resultArr = result_arr;
    }

    private scrollToNumber(): void {
        this.actScroll(this._repeatTime);
    }

    /**
     * 
     * @param time 重複次數
     */
    private actScroll(time: number): void {
        for (let i = 0, max = this.fruitNodes.length; i < max; i++) {
            let node = this.fruitNodes[i];
            let posY = this._limitY;

            //
            cc.tween(node)
                .delay(i * 0.12)
                .to(0.3, { position: cc.v2(0, posY) })
                .call(function () {
                    node.y = this._resetY;
                    this.changeIcon(node, this.randomIcon());

                    if (i === max - 3 && time > 0) {
                        time -= 1;
                        this.actScroll(time);
                    } else if (i === max - 3 && time <= 0) {
                        this.lastRoll();
                    }
                    cc.log(time);
                }.bind(this))
                .start();
        }
    }

    private lastRoll(): void {
        let max = 3;    //預設前三個
        let stopPosY = [-160, 0, 160];

        for (let i = 0; i < max; i++) {
            let node = this.fruitNodes[i];
            this.changeIcon(node, "fruit_" + this._resultArr[i]);
            cc.tween(node)
                .delay(i * 0.12)
                .to(0.3, { position: cc.v2(0, stopPosY[i]) })
                .call(function () {
                    // node.y = this._resetY;
                }.bind(this))
                .start();
        }
    }

    /**
     * 隨機取一張圖片
     * @returns 圖片名
     */
    private randomIcon(): string {
        let number = Math.floor(Math.random() * this._iconCount) + 1;
        return "fruit_" + number;
    }

    /**
     * 更換節點圖片
     * @param node 更換圖片的節點
     * @param icon_name 圖片資源名
     */
    private changeIcon(node: cc.Node, icon_name: string): void {
        node.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes(this._iconDir + icon_name, cc.SpriteFrame);
    }

    //

    // update (dt) {}
}
