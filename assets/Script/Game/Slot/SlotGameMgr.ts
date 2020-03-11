import CommonFunc from "./CommonFunc";
import { SlotEventConst } from "./SlotEventConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SlotGameMgr extends cc.Component {

    @property(cc.Node)
    startBtn: cc.Node = null;

    // @property
    // text: string = 'hello';


    //開獎資料為
    //[
    //  [0, 0, 0],    第一列
    //  [0, 0, 0],    第二列 
    //  [0, 0, 0]     第三列
    //]


    onLoad() {
        this.addEvent();
        this.loadingRes();
    }

    start() {

    }

    loadingRes() {
        cc.loader.loadResDir("fruit", function (err, assets) {
            if(err) {
                cc.log("loading res fail....");
                return;
            }
        }); 
    }

    addEvent(): void {
        this.startBtn.on("click", this.onClickStartBtn, this);
    }

    private onClickStartBtn(): void {
        console.log("start...");
        CommonFunc.getEventNode().emit(SlotEventConst.START_SCROLL);
    }

    // update (dt) {}
}
