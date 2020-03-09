import CommonFunc from "./CommonFunc";
import { SlotEventConst } from "./SlotEventConst";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SlotGameMgr extends cc.Component {

    @property(cc.Node)
    startBtn: cc.Node = null;

    // @property
    // text: string = 'hello';

    onLoad () {
        this.addEvent();
    }    

    start () {

    }

    addEvent():void {
        this.startBtn.on("click", this.onClickStartBtn, this);
    }

    private onClickStartBtn():void {
        console.log("start...");
        CommonFunc.getEventNode().emit(SlotEventConst.START_SCROLL);
    }

    // update (dt) {}
}
