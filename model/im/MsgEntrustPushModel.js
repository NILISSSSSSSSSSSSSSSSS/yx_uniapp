import {DefaultModel} from "../DefaultModel";


export class MsgEntrustPushModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "MsgEntrustPushModel"
    }
    
    getIsLocal() {
        return true;
    }
}
