import CommonFunc from "./CommonFunc";
import { SlotEventConst } from "./SlotEventConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SlotGameMgr extends cc.Component {

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    fruitLines: cc.Node[] = [];

    // @property
    // text: string = 'hello';

    _maxNumber = 11;

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
            if (err) {
                cc.log("loading res fail....");
                return;
            }
        });
    }

    addEvent(): void {
        this.startBtn.on("click", this.onClickStartBtn, this);
    }

    private onClickStartBtn(): void {
        let prizeArr: Array<Array<number>> = this.prizeNumberArr();
        console.log("start...", prizeArr);

        for(let i = 0, max = this.fruitLines.length; i < max; i++) {
            this.fruitLines[i].getComponent("FruitLineMgr").setResult(prizeArr[i]);
        }

        CommonFunc.getEventNode().emit(SlotEventConst.START_SCROLL, prizeArr);
    }

    /**
     * 組出 3 * 3 的開獎二維陣列
     * @returns  開獎結果
     */
    private prizeNumberArr(): Array<Array<number>> {
        let prizeArr: Array<Array<number>> = [];

        for (let i = 0; i < 3; i++) {
            prizeArr[i] = [];

            for (let j = 0; j < 3; j++) {
                prizeArr[i][j] = this.randomNumber();
            }
        }

        return prizeArr;
    }

    /**
     * 隨機取從 1 至最大值的數
     * @returns 隨機數
     */
    private randomNumber(): number {
        let number = Math.floor(Math.random() * this._maxNumber) + 1;

        return number;
    }

    // update (dt) {}
}
