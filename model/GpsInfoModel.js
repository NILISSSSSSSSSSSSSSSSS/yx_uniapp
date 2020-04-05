import {DefaultModel} from "./DefaultModel";


export class GpsInfoModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "GpsInfoDetail"
    }
    
    getIsLocal() {
        return true;
    }
}
