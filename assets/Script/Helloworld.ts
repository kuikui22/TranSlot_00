const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    scrollNode:cc.Node[] = [];

    @property(cc.Button)
    actBtn:cc.Button = null;

    _repeatTimes = 4;

    onLoad() {
        this.addEvent();
    }

    start () {
        
    }

    private addEvent():void {
        this.actBtn.node.on('click', this.clickActBtn, this);
    }

    private clickActBtn():void {
        this._repeatTimes = 4;
        this.rollAct(4);
    }


    private rollAct(repeatTimes):void {

        for(let i = 0; i < this.scrollNode.length; i++) {
            this.scrollNode[i].runAction(cc.sequence(
                cc.delayTime(i*0.5),
                cc.moveTo(0.5, cc.v2(this.scrollNode[i].x, -100)),
                cc.callFunc(function() {
                    this.scrollNode[i].y = 100;

                    if(i === this.scrollNode.length -1 ) {
                        if(repeatTimes > 1) {
                            repeatTimes -= 1;
                            this.rollAct(repeatTimes);
                        } else {
                            this.scrollNode[0].stopAllActions();
                            this.scrollNode[0].runAction(cc.moveTo(0.5, this.scrollNode[0].x, 0));
                        }
                    }
                }.bind(this))
            ));
        }
        
    }
    
}
