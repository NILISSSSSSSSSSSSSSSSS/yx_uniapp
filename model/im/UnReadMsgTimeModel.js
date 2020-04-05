import {DefaultModel} from "../DefaultModel";


export class UnReadMsgTimeModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "UnReadMsgTimeModel"
    }
    
    getIsLocal() {
        return true;
    }
}
