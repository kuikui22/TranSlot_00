import { SlotEventConst } from "./SlotEventConst";
import CommonFunc from "./CommonFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    fruitNodes: cc.Node[] = [];

    _limitY = -320;
    _resetY = 320;
    _repeatTime = 3;

    onLoad() {
        this.addEvents();
    }

    start() {

    }

    private addEvents(): void {
        CommonFunc.getEventNode().on(SlotEventConst.START_SCROLL, this.scrollToNumber, this);
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
            cc.tween(node)
                .delay(i * 0.12)
                .to(0.3, { position: cc.v2(0, stopPosY[i]) })
                .call(function () {
                    // node.y = this._resetY;
                }.bind(this))
                .start();
        }
    }

    //

    // update (dt) {}
}
