import { SlotEventConst } from "./SlotEventConst";
import CommonFunc from "./CommonFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    fruitNodes: cc.Node[] = [];

    _limitY = -320;
    _resetY = 480;
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
    private actScroll(time:number):void {
        for (let i = 0, max = this.fruitNodes.length; i < max; i++) {
            let node = this.fruitNodes[i];

            cc.tween(node)
                .delay(i*0.1)
                .to(0.5, { position: cc.v2(0, this._limitY) })
                .call(function () {
                    node.y = this._resetY;
                    
                    if(i === max-1 && time - 1 > 0) {
                        time -= 1;
                        this.actScroll(time);
                    }
                    

                }.bind(this))
                .start();
        }
    }

    //

    // update (dt) {}
}
