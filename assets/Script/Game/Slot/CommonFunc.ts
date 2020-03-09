export default class CommonFunc {
    public static getEventNode(): cc.Node {
        return cc.director.getScene().getChildByName('EventNode');
    }
}