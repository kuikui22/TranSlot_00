const {ccclass, property} = cc._decorator;

@ccclass
export default class EventCenterMgr extends cc.Component {
    onLoad() {
        cc.log("EventMgr 初始化！");
        cc.game.addPersistRootNode(this.node);
    };
}
