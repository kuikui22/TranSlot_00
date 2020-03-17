import CommonFunc from "./CommonFunc";
import { SlotEventConst } from "./SlotEventConst";
import { LineConst } from "./SlotConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SlotGameMgr extends cc.Component {

    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    fruitLines: cc.Node[] = [];

    @property(cc.Node)
    lines: cc.Node[] = [];

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

    private hasLine(arr): void {
        // 每個陣列的第一個
        if(arr[0][0] === arr[1][0] && arr[1][0] === arr[2][0]) {
            this.showLine(LineConst.Line1);
        }

        // 每個陣列的第二個
        if(arr[0][1] === arr[1][1] && arr[1][1] === arr[2][1]) {
            this.showLine(LineConst.Line2);
        }

        // 每個陣列的第三個
        if(arr[0][2] === arr[1][2] && arr[1][2] === arr[2][2]) {
            this.showLine(LineConst.Line3);
        }

        // 陣列的第一個,第二個,第三個
        if(arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) {
            this.showLine(LineConst.Line4);
        }

        // 陣列的第三個,第二個,第一個
        if(arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]) {
            this.showLine(LineConst.Line5);
        }
    }

    private showLine(line: LineConst): void {
        let node = this.lines[line - 1];
        node.active = true;
        
        this.line1.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.fadeIn(0.5),
                    cc.fadeOut(0.5)
                )
            )
        );
    }

    // update (dt) {}
}
