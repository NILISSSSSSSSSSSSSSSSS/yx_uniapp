import {DefaultModel} from "../DefaultModel";


export class LastMsgTime extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "LastMsgTime"
    }
    
    getIsLocal() {
        return true;
    }
}
